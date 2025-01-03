import { getChatGroupTable } from "@/models"
import { BotProtocolEnum, ImPlatformEnum } from "@/types/common"
import { UniMsgEvent } from "@/types/message"
import { getMsgTextContent } from "@/utils/message"
import { Onebot, OnebotMessageArray, ReplyMessage } from "@kinkinko/onebot-sdk"

export interface BotConfig {
    platform: ImPlatformEnum
    protocol: BotProtocolEnum
    selfId: number
    name: string
    endpoint: string
}

export type BotMessageArray = OnebotMessageArray

export type BotMessage = OnebotMessageArray[number]

export class Bot {
    private _endpoint: BotConfig["endpoint"]

    public platform: BotConfig["platform"]
    public protocol: BotConfig["protocol"]
    public selfId: BotConfig["selfId"]
    public name: BotConfig["name"]
    public sdk: Onebot | null = null

    constructor(config: BotConfig) {
        this.platform = config.platform
        this.protocol = config.protocol
        this.selfId = config.selfId
        this.name = config.name
        this._endpoint = config.endpoint

        // Initialize SDK
        if (this.protocol === BotProtocolEnum.Onebot) {
            this.sdk = new Onebot({ endpoint: this._endpoint })
        }
    }

    async sendGroupMsg(groupId: number, msg: BotMessageArray) {
        if (this.protocol === BotProtocolEnum.Onebot) {
            const res = await this.sdk?.sendGroupMsg({
                group_id: groupId,
                message: msg,
            })
            const groupChatTable = getChatGroupTable(this.platform, groupId)
            if (groupChatTable && res?.message_id) {
                const replyMsg = msg.find((item) => item.type === "reply")
                await groupChatTable.create({
                    id: res?.message_id,
                    userId: this.selfId,
                    userName: this.name,
                    msgArray: {
                        values: msg,
                    },
                    msgRaw: JSON.stringify(msg),
                    textContent: getMsgTextContent(msg),
                    replyMsgId: replyMsg ? +replyMsg.data.id : undefined,
                    imageContent: "",
                })
            }
            return res?.message_id
        }
    }

    async sendPrivateMsg(userId: number, msg: BotMessageArray) {
        if (this.protocol !== BotProtocolEnum.Onebot) {
            const res = await this.sdk?.sendPrivateMsg({
                user_id: userId,
                message: msg,
            })
            return res?.message_id
        }
    }

    async replyMsg(
        origin: UniMsgEvent,
        msg: BotMessageArray,
        option?: {
            /** 是否引用原消息 */
            quote?: boolean
        },
    ) {
        const { quote } = option || {}
        if (this.protocol === BotProtocolEnum.Onebot) {
            const quoteMsg = {
                type: "reply",
                data: {
                    id: `${origin.msgId}`,
                },
            } as ReplyMessage
            if (origin.groupId) {
                if (quote) {
                    await this.sendGroupMsg(origin.groupId, [
                        quoteMsg,
                        {
                            type: "at",
                            data: {
                                qq: `${origin.userId}`,
                            },
                        },
                        {
                            type: "text",
                            data: {
                                text: " ",
                            },
                        },
                        ...msg,
                    ])
                } else {
                    await this.sendGroupMsg(origin.groupId, msg)
                }
            } else if (origin.userId) {
                if (quote) {
                    await this.sendPrivateMsg(origin.userId, [quoteMsg, ...msg])
                }
                await this.sendPrivateMsg(origin.userId, msg)
            }
        }
    }

    async getGroupList() {
        if (this.protocol === BotProtocolEnum.Onebot) {
            const res = await this.sdk?.getGroupList()
            return res
        }
    }
}

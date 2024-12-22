import { OnebotMessageArray } from "@kinkinko/onebot-sdk"

/**
 * 通用的消息事件
 */
export interface UniMsgEvent {
    protocol: "onebot"
    platform: "qq" | "telegram"
    msgId: number
    /** 发送者 id */
    userId: number
    /** 发送者名称 */
    userName: string
    /** 群组 id，没有说明为私聊消息 */
    groupId?: number
    /** 纯文本内容 */
    textContent: string
    /** 图片内容 */
    imageContent: string
    /** 回复消息的 id */
    replyMsgId?: number
    /** 以 onebot 协议的数据格式存放完整的消息数据 */
    msgArray: {
        values: OnebotMessageArray
    }
    /** 协议的原数据 */
    msgRaw: any
}

import { Bot } from "@/constructors/Bot"
import { getChatGroupTable } from "@/models"
import { UniMsgEvent } from "@/types/message"

export class ChatStat {
    constructor() {}

    async receiveMessage(msg: UniMsgEvent, bot: Bot) {
        if (msg.groupId) {
            await this._handleGroupMessage(msg, bot)
        }
    }

    /**
     * 处理群消息
     */
    private async _handleGroupMessage(msg: UniMsgEvent, bot: Bot) {
        const groupId = msg.groupId!
        const chatGroupTable = getChatGroupTable(bot.platform, groupId)
        if (!chatGroupTable) {
            return
        }
        await chatGroupTable?.create({
            id: msg.msgId,
            userId: msg.userId,
            userName: msg.userName,
            textContent: msg.textContent,
            imageContent: msg.imageContent,
            replyMsgId: msg.replyMsgId,
            msgArray: msg.msgArray,
            msgRaw: JSON.stringify(msg.msgRaw),
        })
    }
}

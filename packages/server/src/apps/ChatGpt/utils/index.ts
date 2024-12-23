import { GroupChatInstance } from "@/models/GroupChat"
import { UniMsgEvent } from "@/types/message"

/**
 * 创建聊天信息文本，用于发送给 openai
 */
export function createChatInfoText(msg: UniMsgEvent | GroupChatInstance) {
    return `${msg.userName}(${msg.userId}): ${msg.textContent}`
}

import { UniMsgEvent } from "@/types/message"
import {
    GroupMessageEvent,
    OnebotMessage,
    OnebotMessageEvent,
} from "@kinkinko/onebot-sdk"

/**
 * 将 onebot 等协议的消息事件转换为通用的消息事件
 * @param originMsgEvent 原始的消息事件
 * @returns 通用的消息事件
 */
export function getUniMsgEvent(originMsgEvent: OnebotMessageEvent) {
    // onebot 协议转换
    /**
     * 是是否与机器人的对话，判断依据:
     * 1. 消息中是否有 at 机器人的内容
     * 2. 是否是私聊对话
     */
    const isToBot =
        originMsgEvent.message.some(
            (msg) =>
                msg.type === "at" && +msg.data.qq === originMsgEvent.self_id,
        ) || !("group_id" in originMsgEvent)
    return {
        protocol: "onebot",
        platform: "qq",
        msgId: originMsgEvent.message_id,
        userId: originMsgEvent.user_id,
        userName: originMsgEvent.sender.nickname,
        groupId: (originMsgEvent as GroupMessageEvent).group_id,
        textContent: getTextContent(originMsgEvent.message),
        imageContent: "",
        replyMsgId:
            originMsgEvent.message.find((msg) => msg.type === "reply")?.data
                .id ?? undefined,
        toBot: isToBot ? originMsgEvent.self_id : undefined,
        msgArray: {
            values: originMsgEvent.message,
        },
        msgRaw: originMsgEvent.message,
    } as UniMsgEvent
}

/**
 * 从协议的消息数据中提取纯文本内容
 */
export function getTextContent(msg: OnebotMessage[]) {
    let text = ""
    // onebot 协议的消息数据格式
    for (const segment of msg) {
        if (segment.type === "text") {
            text += segment.data.text
        } else if (segment.type === "at") {
            text += `@${segment.data.qq}`
        } else if (segment.type === "image") {
            text += "[图片]"
        } else if (segment.type === "face") {
            text += "[表情]"
        }
    }
    return text
}

import { BotMessage, BotMessageArray } from "@/constructors/Bot"
import { openaiImageRecognizer } from "@/instances/openaiImageRecognizer"
import { UniMsgEvent } from "@/types/message"
import { GroupMessageEvent, OnebotMessageEvent } from "@kinkinko/onebot-sdk"

/**
 * 将 onebot 等协议的消息事件转换为通用的消息事件
 * @param originMsgEvent 原始的消息事件
 * @returns 通用的消息事件
 */
export async function getUniMsgEvent(originMsgEvent: OnebotMessageEvent) {
    // onebot 协议转换
    /**
     * 是是否与机器人的对话，判断依据:
     * 1. 消息中是否有 at 机器人的内容
     * 2. 是否是私聊对话
     */
    // 每个协议的消息都要实现 botMessageArray 的存储类型转换
    const botMessageArray: BotMessageArray = originMsgEvent.message
    const isToBot =
        originMsgEvent.message.some(
            (msg) =>
                msg.type === "at" && +msg.data.qq === originMsgEvent.self_id,
        ) || !("group_id" in originMsgEvent)
    const imageMessage = originMsgEvent.message.find(
        (item) => item.type === "image",
    )
    return {
        protocol: "onebot",
        platform: "qq",
        msgId: originMsgEvent.message_id,
        userId: originMsgEvent.user_id,
        userName: originMsgEvent.sender.nickname,
        groupId: (originMsgEvent as GroupMessageEvent).group_id,
        textContent: getMsgTextContent(botMessageArray),
        imageContent: imageMessage?.data.url
            ? await openaiImageRecognizer.recognize(imageMessage.data.url)
            : undefined,
        replyMsgId:
            originMsgEvent.message.find((msg) => msg.type === "reply")?.data
                .id ?? undefined,
        toBot: isToBot ? originMsgEvent.self_id : undefined,
        msgArray: {
            values: botMessageArray,
        },
        msgRaw: originMsgEvent.message,
    } as UniMsgEvent
}

/**
 * 将 BotMessageArray 消息提取为纯文本内容
 */
export function getMsgTextContent(msg: BotMessageArray) {
    let text = ""
    // onebot 协议的消息数据格式
    for (const segment of msg) {
        switch (segment.type) {
            case "text":
                text += segment.data.text
                break
            case "at":
                text += `@${segment.data.qq}`
                break
            case "image":
                text += "[图片]"
                break
            case "face":
                text += "[表情]"
                break
        }
    }
    return text
}

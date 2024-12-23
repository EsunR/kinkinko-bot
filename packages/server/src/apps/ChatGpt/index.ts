import { Bot } from "@/constructors/Bot"
import { getChatGroupTable } from "@/models"
import { UniMsgEvent } from "@/types/message"
import { appConfig } from "@/utils/config"
import OpenAI from "openai"
import { createNormalChatPrompt } from "./config/prompt"
import { createChatInfoText } from "./utils"
import { logger } from "@/utils/log"

const chatgptConfig = appConfig.chatgpt
const openai = new OpenAI({
    baseURL: chatgptConfig.baseURL,
    apiKey: chatgptConfig.apiKey,
})

export class ChatGpt {
    constructor() {}

    async receiveMessage(msg: UniMsgEvent, bot: Bot) {
        // 暂时不支持私聊
        if (!msg.textContent || !msg.groupId) {
            return
        }
        const groupChatTable = getChatGroupTable(bot.platform, msg.groupId!)
        if (!groupChatTable) {
            return
        }
        // 最近 n 条的聊天记录
        const chatRecords = (await groupChatTable.findAll({
            limit: 20,
            order: [["createdAt", "DESC"]],
            offset: 1,
        })).reverse()
        const prompt = createNormalChatPrompt(chatRecords)
        logger.debug("[ChatGpt] 群聊执行 Prompt", prompt)
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
                { role: "user", content: createChatInfoText(msg) },
            ],
            model: chatgptConfig.model,
        })
        const chatContent = chatCompletion.choices?.[0]?.message?.content
        if (chatContent) {
            await bot.replyMsg(msg, [
                {
                    type: "text",
                    data: {
                        text: chatContent,
                    },
                },
            ])
        }
    }
}

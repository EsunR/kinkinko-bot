import { Bot } from "@/constructors/Bot"
import { getChatGroupTable } from "@/models"
import { UniMsgEvent } from "@/types/message"
import { appConfig } from "@/utils/config"
import OpenAI from "openai"
import { createNormalChatPrompt } from "./config/prompt"

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
        // 最近 10 条的聊天记录
        const chatRecords = await groupChatTable.findAll({
            limit: 10,
            order: [["createdAt", "DESC"]],
            offset: 1,
        })
        const prompt = createNormalChatPrompt(chatRecords)
        console.log(prompt);
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
                { role: "user", content: msg.textContent },
            ],
            model: "gpt-4o-mini",
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

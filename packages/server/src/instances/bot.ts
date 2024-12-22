import { Bot } from "@/constructors/Bot"
import { serverConfig } from "@/utils/config"

export const botMap = new Map<number, Bot>()

serverConfig.bots.forEach((bot) => {
    botMap.set(bot.selfId, new Bot(bot))
})

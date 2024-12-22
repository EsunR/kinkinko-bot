import { Bot } from "@/constructors/Bot"
import { sequelize } from "@/instances/sequelize"
import { ImPlatformEnum } from "@/types/common"
import { logger } from "@/utils/log"
import { ModelStatic } from "sequelize"
import { createGroupChatModel, GroupChatInstance } from "./GroupChat"

export const dbTables: {
    chatGroups: ModelStatic<GroupChatInstance>[]
} = {
    chatGroups: [],
}

export async function initDb(ctx: { bots: Bot[] }) {
    try {
        await sequelize.authenticate()
        logger.info("数据库连接成功，正在同步表结构")

        // 为群组创建表
        for (const bot of ctx.bots) {
            const botGroups = await bot.getGroupList()
            if (botGroups instanceof Array) {
                for (const group of botGroups) {
                    const table = createGroupChatModel(
                        sequelize,
                        `${bot.platform}_${group.group_id}`,
                    )
                    await table.sync()
                    dbTables.chatGroups.push(table)
                }
            }
        }

        logger.info("表结构同步完成，正在启动应用... ...")
    } catch {
        logger.error("数据库连接失败")
    }
}

export function getChatGroupTable(
    platform: ImPlatformEnum,
    groupId: string | number,
) {
    return dbTables.chatGroups.find(
        (table) => table.tableName === `GroupChat_${platform}_${groupId}`,
    )
}

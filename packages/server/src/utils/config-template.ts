import { BotProtocolEnum, ImPlatformEnum } from "@/types/common"
import { ServerConfig } from "@/types/config"
import path from "path"

export const isDev = process.env.NODE_ENV === "development"

export const serverConfig: ServerConfig = {
    port: 3001,
    logPath: isDev ? path.join(__dirname, "../../temp") : "",
    bots: [
        {
            selfId: 0,
            name: "bot",
            platform: ImPlatformEnum.QQ,
            protocol: BotProtocolEnum.Onebot,
            endpoint: "http://localhost:3000",
        },
    ],
    db: {
        host: "localhost",
        database: "***",
        port: 3306,
        username: "root",
        password: "***",
    },
}

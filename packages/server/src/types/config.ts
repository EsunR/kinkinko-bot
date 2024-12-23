import { BotConfig } from "@/constructors/Bot"

export interface ServerConfig {
    port: number
    logPath: string
    bots: BotConfig[]
    db: {
        host: string
        port: number
        username: string
        password: string
        database: string
    },
    /** 图像识别工具 */
    imageRecognition?: {
        openai?: {
            baseURL: string
            apiKey: string
            model: string
        }
    }
}

export interface AppConfig {
    chatStat: {}
    chatgpt: {
        baseURL: string
        model: string
        apiKey: string
    }
}

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
    }
}

export interface AppConfig {
    chatgpt: {
        baseURL: string
        model: string
        apiKey: string
    }
}

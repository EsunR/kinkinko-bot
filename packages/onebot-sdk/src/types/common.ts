export interface OnebotConfig {
    /** 消息发送的目标地址 */
    endpoint: string
}

export enum PostTypeEnum {
    Message = "message",
}

export enum MessageTypeEnum {
    Private = "private",
    Group = "group",
}

export enum SubTypeEnum {
    Friend = "friend",
    Group = "group",
    Other = "other",
    Normal = "normal",
    Anonymous = "anonymous",
    Notice = "notice",
}

export enum SexEnum {
    Male = "male",
    Female = "female",
    Unknown = "unknown",
}

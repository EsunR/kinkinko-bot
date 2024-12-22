/**
 * @file Onebot11 消息类型
 * @link https://github.com/botuniverse/onebot-11/blob/master/message/segment.md
 * @author EsunR
 */

interface BaseMessage {
    type: string
    data: any
}

/**
 * 纯文本
 * @link https://github.com/botuniverse/onebot-11/blob/master/message/segment.md#%E7%BA%AF%E6%96%87%E6%9C%AC
 */
export interface TextMessage extends BaseMessage {
    type: "text"
    data: {
        text: string
    }
}

/**
 * QQ 表情
 * @link https://github.com/botuniverse/onebot-11/blob/master/message/segment.md#qq-%E8%A1%A8%E6%83%85
 */
export interface FaceMessage extends BaseMessage {
    type: "face"
    data: {
        id: string
    }
}

/**
 * 图片
 * @link https://github.com/botuniverse/onebot-11/blob/master/message/segment.md#%E5%9B%BE%E7%89%87
 */
export interface ImageMessage extends BaseMessage {
    type: "image"
    data: {
        /** 图片文件名 */
        file: string
        /** 图片类型，flash 表示闪照，无此参数表示普通图片 */
        type?: "flash"
        /** 图片 URL */
        url?: string
        /** 只在通过网络 URL 发送时有效，表示是否使用已缓存的文件，默认 1 */
        cache?: 0 | 1
        /** 只在通过网络 URL 发送时有效，表示是否通过代理下载文件（需通过环境变量或配置文件配置代理），默认 1 */
        proxy?: 0 | 1
        /** 只在通过网络 URL 发送时有效，单位秒，表示下载网络文件的超时时间，默认不超时 */
        timeout?: number
    }
}

/**
 * 语音
 * @link https://github.com/botuniverse/onebot-11/blob/master/message/segment.md#%E8%AF%AD%E9%9F%B3
 */
export interface RecordMessage extends BaseMessage {
    type: "record"
    data: {
        file: string
        magic: 0 | 1
        url?: string
        cache?: 0 | 1
        proxy?: 0 | 1
        timeout?: number
    }
}

/**
 * 短视频
 * @link https://github.com/botuniverse/onebot-11/blob/master/message/segment.md#%E7%9F%AD%E8%A7%86%E9%A2%91
 */
export interface VoiceMessage extends BaseMessage {
    type: "voice"
    data: {
        file: string
        url?: string
        cache?: 0 | 1
        proxy?: 0 | 1
        timeout?: number
    }
}

/**
 * At 某人
 * @link https://github.com/botuniverse/onebot-11/blob/master/message/segment.md#%E6%9F%90%E4%BA%BA
 */
export interface AtMessage extends BaseMessage {
    type: "at"
    data: {
        /** At 的 QQ 号，all 表示全体成员 */
        qq: string
    }
}

/**
 * 回复
 * @link https://github.com/botuniverse/onebot-11/blob/master/message/segment.md#回复
 */
export interface ReplyMessage extends BaseMessage {
    type: "reply"
    data: {
        /** 回复的消息 ID */
        id: string
    }
}

export type OnebotMessage =
    | TextMessage
    | FaceMessage
    | ImageMessage
    | RecordMessage
    | VoiceMessage
    | AtMessage
    | ReplyMessage

export type OnebotMessageArray = OnebotMessage[]

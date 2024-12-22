import { MessageTypeEnum, PostTypeEnum, SexEnum, SubTypeEnum } from "./common"
import { OnebotMessageArray } from "./message"

export interface PrivateMessageSender {
    user_id: number
    nickname: string
    sex: SexEnum
    age: number
}

export interface Anonymous {
    id: number
    name: string
    flag: string
}

export interface GroupMessageSender extends PrivateMessageSender {
    area: string
    level: string
    role: string
    title: string
}

/**
 * 私聊消息
 * @link https://github.com/botuniverse/onebot-11/blob/master/event/message.md#私聊消息
 */
export interface PrivateMessageEvent {
    time: number
    self_id: number
    post_type: PostTypeEnum.Message
    message_type: MessageTypeEnum.Private
    sub_type: SubTypeEnum.Friend | SubTypeEnum.Group | SubTypeEnum.Other
    message_id: number
    user_id: number
    message: OnebotMessageArray
    raw_message: any
    font: number
    sender: PrivateMessageSender
}

/**
 * 群消息
 * @link https://github.com/botuniverse/onebot-11/blob/master/event/message.md#群消息
 */
export interface GroupMessageEvent {
    time: number
    self_id: number
    post_type: PostTypeEnum.Message
    message_type: MessageTypeEnum.Group
    sub_type: SubTypeEnum.Normal | SubTypeEnum.Anonymous | SubTypeEnum.Notice
    message_id: number
    group_id: number
    user_id: number
    anonymous: Anonymous
    message: OnebotMessageArray
    raw_message: any
    font: number
    sender: GroupMessageSender
}

export type OnebotEvent = PrivateMessageEvent | GroupMessageEvent

export type OnebotMessageEvent = PrivateMessageEvent | GroupMessageEvent

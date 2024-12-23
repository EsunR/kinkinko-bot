/**
 * @file 公共 API
 * @link https://github.com/botuniverse/onebot-11/blob/master/api/public.md
 * @author EsunR
 */
import { MessageTypeEnum } from "./common"
import { OnebotMessageArray } from "./message"

export interface SendPrivateMsgReq {
    user_id: number
    message: OnebotMessageArray
    auto_escape?: boolean
}

export interface SendPrivateMsgRes {
    message_id: number
}

export interface SendGroupMsgReq {
    group_id: number
    message: OnebotMessageArray
    auto_escape?: boolean
}

export interface SendGroupMsgRes {
    message_id: number
}

export interface SendMsgReq {
    message_type: MessageTypeEnum
    user_id?: number
    group_id?: number
    message: OnebotMessageArray
    auto_escape?: boolean
}

export interface SendMsgRes {
    message_id: number
}

export type GetGroupListRes = {
    group_id: number
    group_name: string
    member_count: number
    max_member_count: number
}[]

export interface GetFileReq__ONLYNAPCAT {
    file_id: string;
}

export interface GetFileRes__ONLYNAPCAT {
    file: string;
    url: string;
    file_size: number;
    file_name: string;
    base64: string;
}
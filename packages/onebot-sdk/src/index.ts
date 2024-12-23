import { AxiosInstance } from "axios"
import { OnebotConfig } from "./types"
import {
    GetFileReq__ONLYNAPCAT,
    GetFileRes__ONLYNAPCAT,
    GetGroupListRes,
    SendGroupMsgReq,
    SendGroupMsgRes,
    SendMsgReq,
    SendMsgRes,
    SendPrivateMsgReq,
    SendPrivateMsgRes,
} from "./types/publicApi"
import { createRequest } from "./utils/request"

export class Onebot {
    private _config: OnebotConfig
    private _request: AxiosInstance

    constructor(config: OnebotConfig) {
        this._config = config
        this._request = createRequest({
            baseURL: this._config.endpoint,
        })
    }

    public async sendPrivateMsg(req: SendPrivateMsgReq) {
        const res = await this._request.post("/send_private_msg", req)
        return res.data?.data as SendPrivateMsgRes
    }

    public async sendGroupMsg(req: SendGroupMsgReq) {
        const res = await this._request.post("/send_group_msg", req)
        return res.data?.data as SendGroupMsgRes
    }

    public async sendMsg(req: SendMsgReq) {
        const res = await this._request.post("/send_msg", req)
        return res.data?.data as SendMsgRes
    }

    public async getGroupList() {
        const res = await this._request.get("/get_group_list")
        return res.data?.data as GetGroupListRes
    }

    public async getFile__ONLYNAPCAT(req: GetFileReq__ONLYNAPCAT) {
        const res = await this._request.get("/get_file", {
            params: req,
        })
        return res.data?.data as GetFileRes__ONLYNAPCAT
    }
}

export * from "./types"

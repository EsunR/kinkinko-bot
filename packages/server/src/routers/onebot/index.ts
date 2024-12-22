import ResBody from "@/constructors/ResBody"
import { chatStat } from "@/instances/apps/chatStat"
import { botMap } from "@/instances/bot"
import { logger } from "@/utils/log"
import { getUniMsgEvent } from "@/utils/message"
import { OnebotEvent, PostTypeEnum } from "@kinkinko/onebot-sdk"
import Router from "koa-router"

const router: Router = new Router()

router.post("/webhook", async (ctx) => {
    const body = ctx.request.body as OnebotEvent
    if (!body.self_id) {
        logger.error("onebot webhook 接口缺少 self_id")
        throw new Error("400-缺少校验参数")
    }

    const bot = botMap.get(body.self_id)
    if (!bot) {
        logger.error(`bot ${body.self_id} 不存在`)
        throw new Error("400-校验参数错误")
    }

    if (body.post_type === PostTypeEnum.Message) {
        const uniMsgEvent = getUniMsgEvent(body)
        chatStat.receiveMessage(uniMsgEvent, bot)
    }

    ctx.body = new ResBody({
        data: { time: new Date() },
    })
})

export default router

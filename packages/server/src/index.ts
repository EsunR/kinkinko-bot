import errorHandler from "@/middlewares/errorHandler"
import onebotRouter from "@/routers/onebot"
import testRouter from "@/routers/test"
import { serverConfig } from "@/utils/config"
import { logger } from "@/utils/log"
import cors from "@koa/cors"
import Koa from "koa"
import KoaBody from "koa-body"
import KoaLogger from "koa-logger"
import Router from "koa-router"
import { initDb } from "./models"
import { botMap } from "./instances/bot"

async function main() {
    await initDb({
        bots: Array.from(botMap.values()),
    })

    const app = new Koa()
    const router: Router = new Router()

    app.use(KoaLogger())
    app.use(errorHandler())
    app.use(cors())
    app.use(
        KoaBody({
            multipart: true,
            formidable: {
                maxFieldsSize: 2000 * 1024 * 1024,
            },
        }),
    )

    router.use("/api/test", testRouter.routes())
    router.use("/api/onebot", onebotRouter.routes())
    app.use(router.routes()).use(router.allowedMethods())

    app.listen(serverConfig.port)
    logger.info(`服务已启动：http://localhost:${serverConfig.port}`)
}

main()

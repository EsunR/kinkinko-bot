import Koa from "koa"
import ResBody from "../constructors/ResBody"

export default function () {
  return async function (ctx: Koa.Context, next: Koa.Next) {
    try {
      await next()
    } catch (err) {
      if (err instanceof Error) {
        // 判断是否携带有错误码
        const messageArr = err.message.split("-")
        if (messageArr.length > 0 && !isNaN(parseInt(messageArr[0]))) {
          ctx.status = parseInt(messageArr[0])
          err.message = messageArr[1]
        } else {
          ctx.status = 500
        }
        // 返回错误
        ctx.body = new ResBody({
          success: false,
          msg: err.message,
        })
        ctx.app.emit("error", err, ctx)
      }
    }
  }
}

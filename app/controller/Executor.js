// @flow
import Router    from "koa-router"
import WebSocket from "ws"

module.exports = (app: any) => {
    const router = Router()

    // POST /Execute
    router.post("/Execute", async ctx => {
        try {
            ctx.body = {}
        } catch(ex) {
            ctx.status = 500
            ctx.body   = {
                status: false,
                error: ex
            }
        }
    })

    return router
}

import logger from "../common/RequestLogger"

export default async (ctx, next) => {
    // Before logging
    const start = new Date()
    logger.info(
    `<----- ${ctx.method} ${ctx.url}`, {
        body: ctx.request.body,
        headers: ctx.headers,
        href: ctx.href,
        ip: ctx.ip
    })
    // Run middleware, log errors
    try {
        await next()
    } catch(ex) {
        console.error(ex)
        logger.error(
        `-ERR-- ${ctx.method} ${ctx.url} ${ex}`, {
            exception: ex
        })
    }
    // After logging
    const end      = new Date()
    const elapsed  = end - start
    const afterMsg = `-${ctx.status}-> ${ctx.method} ${ctx.url} ${elapsed}ms`
    const afterLog = ctx.status >= 400 ? logger.error : logger.info
    afterLog(afterMsg, {
        body: ctx.body,
        headers: ctx.response.headers,
        responseTime: elapsed
    })
}

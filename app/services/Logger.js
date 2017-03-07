const winston = require("winston")

module.exports = app => {
    app.context.logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                timestamp: true,
                colorize: true,
                prettyPrint: true,
                depth: 10
            }),
            new (winston.transports.File)({
                filename: "logs/requests.log"
            })
        ]
    })

    app.use(async (ctx, next) => {
        // Before logging
        const start = new Date()
        app.context.logger.info(
        `<----- ${ctx.method} ${ctx.url}`, {
            body: ctx.request.body,
            headers: ctx.headers,
            href: ctx.href,
            ip: ctx.ip
        })
        // Run middleware
        await next()
        // After logging
        const end     = new Date()
        const elapsed = end - start
        app.context.logger.info(
        `-${ctx.status}-> ${ctx.method} ${ctx.url} ${elapsed}ms`, {
            body: ctx.body,
            headers: ctx.response.headers,
            responseTime: elapsed
        })
    })
}

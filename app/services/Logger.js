import fs      from "fs-extra"
import winston from "winston"

module.exports = app => {
    fs.ensureDirSync("logs")

    app.context.logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                colorize: true,
                depth: 10,
                timestamp: () => new Date().toLocaleString(),
                formatter: options =>
                    `[${options.timestamp()}] ${options.level} ` +
                    `${options.message}`
            }),
            new (winston.transports.File)({
                timestamp: true,
                filename: "logs/requests.log",
                maxsize: 1048576,
                maxFiles: 5,
                tailable: true
            })
        ]
    })

    app.use(async (ctx, next) => {
        // Before logging
        const start = new Date()
        ctx.logger.info(
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
            app.context.logger.error(
            `-ERR-- ${ctx.method} ${ctx.url} ${ex}`, {
                exception: ex
            })
        }
        // After logging
        const end     = new Date()
        const elapsed = end - start
        ctx.logger.info(
        `-${ctx.status}-> ${ctx.method} ${ctx.url} ${elapsed}ms`, {
            body: ctx.body,
            headers: ctx.response.headers,
            responseTime: elapsed
        })
    })
}

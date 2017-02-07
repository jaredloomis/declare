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
                filename: "logs/application.log"
            })
        ]
    })

    app.use(async (ctx, next) => {
        const start = new Date()
        await next()
        const elapsed = new Date() - start
        app.context.logger.info("", {
            responseTime: elapsed
        })
    })
}

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
}

const winston = require("winston")

module.exports = app => new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: true,
            colorize: true,
            prettyPrint: true,
            depth: 10
        }),
        new (winston.transports.File)({
            name: "info-file",
            filename: "filelog-info.log",
            level: "info"
        }),
        new (winston.transports.File)({
            name: "error-file",
            filename: "filelog-error.log",
            level: "error"
        })
    ]
})

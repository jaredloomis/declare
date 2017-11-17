import winston from "winston"

export default new (winston.Logger)({
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

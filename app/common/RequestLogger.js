import fs      from "fs-extra"
import winston from "winston"

// Make sure logs dir exists
fs.ensureDirSync("logs")

const transports = []

// Add console transport
if(process.env.NODE_ENV !== "production") {
    transports.push(new winston.transports.Console({
        colorize: true,
        depth: 10,
        timestamp: () => new Date().toLocaleString(),
        formatter: options =>
            `[${options.timestamp()}] ${options.level} ` +
            `${options.message}`
    }))
}

transports.push(new winston.transports.File({
    timestamp: true,
    filename:  "logs/requests.log",
    maxsize:   1048576,
    maxFiles:  5,
    tailable:  true
}))

export default new winston.Logger({transports})

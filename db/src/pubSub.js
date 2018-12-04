import Promise         from "bluebird"
import {createContext} from "rabbit.js"

import config          from "./config"

const context = createContext(`amqp://${config.host}`)

const EXCHANGE = "declare_events"

const pubSub = new Promise((resolve, reject) => {
    context.on("ready", () => {
        const pub = context.socket("PUBLISH", {
                    routing: "topic"
                }),
              sub = context.socket("SUBSCRIBE", {
                    routing: "topic"
                })

        sub.pipe(process.stdout)
        sub.connect(EXCHANGE, "#", () => {
            pub.connect(EXCHANGE, () => {
                resolve({pub, sub})
            })
        })
    })
})

module.exports = {
    //pubSub: null, EXCHANGE: null, context: null
    pubSub, EXCHANGE, context
}

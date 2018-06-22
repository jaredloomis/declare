import Promise         from "bluebird"
import {createContext} from "rabbit.js"

const context = createContext("amqp://localhost")

export const EXCHANGE = "declare_events"

export default new Promise((resolve, reject) => {
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

import amqp            from "amqplib"

import config          from "./config"

//const context = 

const queueName = "declare_events"

const pubSub = (async () => {
    try {
        console.log("RabbitMQ URL:", `amqp://admin:B3o8mFCcKq5sIB@${config.host}/${config.vhost}`)
        return amqp.connect(`amqp://admin:B3o8mFCcKq5sIB@${config.host}/${config.vhost}`)
    } catch(ex) {
        console.warn("pubSub error:", ex)
        return ex
    }
})()

const publish = async msg => {
    try {
        const conn = await pubSub
        const ch   = await conn.createChannel()
        const ok   = await ch.assertQueue(queueName, {durable: false})
        const ok2  = await ch.assertExchange(queueName, "fanout", {durable: false})
        await ch.bindQueue(ok.queue, queueName)
        await ch.sendToQueue(queueName, Buffer.from(msg))
    } catch(ex) {
        console.warn(ex)
    }
}

const subscribe = async handler => {
    try {
        const conn = await pubSub
        process.once("SIGINT", () => conn.close())
        const ch = await conn.createChannel()
        const ok = await ch.assertQueue(queueName, {durable: false})
        await ch.assertExchange(queueName, "fanout", {durable: false})
        await ch.bindQueue(ok.queue, queueName)
        ch.consume(queueName, handler, {noAck: true})
    } catch(ex) {
        console.warn(ex)
    }
}

module.exports = {
    //pubSub: null, EXCHANGE: null, context: null
    pubSub, queueName, publish, subscribe
}

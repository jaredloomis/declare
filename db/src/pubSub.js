import amqp   from "amqplib"
import config from "./config"

const queueName = "declare_events"

const pubSub = (async () => {
    /*
    try {
        const uri =
            `amqp://${config.pubsubUsername}:${config.pubsubPassword}@` +
            `${config.host}/${config.vhost}`
        console.log("RabbitMQ URL:", uri)
        return amqp.connect(uri)
    } catch(ex) {
        console.warn("pubSub error:", ex)
        return ex
    }*/
    return {}
})()

const publish = async msg => {
    /*
    try {
        const conn = await pubSub
        const ch   = await conn.createChannel()
        const ok   = await ch.assertQueue(queueName, {durable: false})
        const ok2  = await ch.assertExchange(queueName, "fanout", {durable: false})
        await ch.bindQueue(ok.queue, queueName)
        await ch.sendToQueue(queueName, Buffer.from(msg))
    } catch(ex) {
        console.warn(ex)
    }*/
}

const subscribe = async handler => {
    /*
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
    }*/
}

module.exports = {
    pubSub, queueName, publish, subscribe
}

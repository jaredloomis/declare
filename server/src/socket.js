import WebSocket from "ws"
import {pubSub}  from "declare-db"
import config    from "./config/websocket"

module.exports = server => {
    const wss = new WebSocket.Server({
        port: config.port,
        server
    })

    console.log(`Listening for websockets on port ${config.port}...`)

    wss.on("connection", ws => {
        console.log("WebSocket connection established")

        // Track dead connections with ws.isAlive
        ws.isAlive = true

        ws.on("pong", function() {
            this.isAlive = true
        })

        // Watch for dead connections by sending a heartbeat
        setInterval(() =>
            wss.clients.forEach(client => {
                if(client.isAlive === false) {
                    console.log("WebSocket connection broke")
                    return client.terminate()
                }
                client.isAlive = false
                client.ping(() => {})
            })
        , 30000)

        // Recieve messages. Currently just ping-pongs msgs
        ws.on("message", msg =>
            ws.send(JSON.stringify({request: msg}))
        )

        // Send messages from pubsub system to websocket clients
        pubSub.subscribe(msg => {
            if(ws.readyState === 1) {
                ws.send(msg.content.toString("utf8"))
            } else {
                console.warn("WebSocket closed! Can't send pubSub msg")
            }
        })

        // Simply log errors
        ws.on("error", err =>
            console.log("WebSocket error: ", err)
        )
    })

    wss.on("close", ws => {
        console.log("WebSocket Closed:", ws)
    })
    wss.on("error", ws => {
        console.log("WebSocket Error", ws)
    })
}

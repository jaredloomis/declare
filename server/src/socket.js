import WebSocket from "ws"
import {pubSub}  from "declare-db"
import config    from "./config/websocket"

module.exports = server => {
    const wss = new WebSocket.Server({
        port: config.port,
        server
    })

    wss.on("connection", ws => {
        console.log(`Listening for websockets on port ${config.port}...`)
        ws.on("message", msg => {
            ws.send(JSON.stringify({request: msg}))
        })
        ws.on("close", () => {
        })
        ws.on("error", err => {
            console.log("WebSocket error: ", err)
        })
        pubSub.pubSub.then(({sub}) =>
            sub.on("data", msg => {
                if(ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(msg.toString("utf8"))
                }
            })
        )
    })
}

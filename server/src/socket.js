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
        //ws.on("close", () => {
        //})
        ws.on("error", err => {
            //ws.close()
            console.log("WebSocket error: ", err)
        })
        pubSub.subscribe(msg => {
            if(ws.readyState === 1) {
                ws.send(msg.content.toString("utf8"))
            } else {
                console.warn("WebSocket closed! Can't send pubSub msg")
            }
        })
    })
}

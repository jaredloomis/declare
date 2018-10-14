import {Server, OPEN} from "ws"
import {pubSub}       from "declare-db"

module.exports = server => {
    const wss = new Server({server})

    wss.on("connection", ws => {
        console.log("A user connected")
        ws.on("message", msg => {
            console.log("Message from WebSocket: ", msg)
        })
        ws.on("close", () => {
            console.log("user disconnected")
        })
        ws.on("error", err => {
            console.log("WebSocket error: ", err)
        })
        pubSub.then(({sub}) =>
            sub.on("data", msg => {
                if(ws && ws.readyState === OPEN) {
                    ws.send(JSON.stringify(msg))
                }
            })
        )
    })
}

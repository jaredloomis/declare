import store from "../store"

const {protocol, path, port} = process.env.NODE_ENV === "production" ?
    ({protocol: "wss", path: "/websocket", port: "443"}) :
    ({protocol: "ws",  path: "",           port: "3001"})

const socket = new WebSocket(
    `${protocol}://${window.location.hostname}:${port}/${path}`
)

let listeners = []

socket.onmessage = event => {
    listeners.forEach(({listener}) => listener(event))
}

export const registerListener = listener => {
    // Add listener to array
    const id = Math.random()
    listeners.push({id, listener})

    // Return an un-register event
    return () => {
        listeners = listeners.filter(({iid}) => iid !== id)
    }
}

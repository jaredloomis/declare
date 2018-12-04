import store from "../store"

const socket = new WebSocket(`wss://${window.location.hostname}:80/websocket`)

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

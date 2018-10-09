const socket = new WebSocket("ws://localhost:3000")

let listeners = []

socket.onmessage = event => {
    listeners.forEach(({listener}) => listener(event))
}

export const registerListener = listener => {
    const id = Math.random()
    listeners.push({id, listener})
    return () => {
        listeners = listeners.filter(({iid}) => iid !== id)
    }
}

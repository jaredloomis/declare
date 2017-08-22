import Server from "socket.io"

module.exports = server => {
    const io = new Server(server)
    io.on("connection", socket => {
        console.log("A user connected")
        socket.on("disconnect", () => {
            console.log("user disconnected")
        })
    })
}

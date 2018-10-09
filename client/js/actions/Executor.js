// @flow
import io from "socket.io-client"

import {EXECUTOR_CONNECT} from "./Types"
import type {Func} from "../flow"

const socket = io()

io.on("connection", function(socket) {
    console.log("a user connected")
    socket.on("disconnect", function(){
        console.log("user disconnected")
    })
})

export const connect = async (dispatch: Func) => {
    dispatch({
        type: EXECUTOR_CONNECT
    })
}

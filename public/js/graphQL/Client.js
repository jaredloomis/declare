import {Lokka} from "lokka"
import {Transport} from "lokka-transport-http"

//import graphql from "graphql.js"

export default new Lokka({
    transport: new Transport("/graphql")
})

//export default graphql("/graphql")

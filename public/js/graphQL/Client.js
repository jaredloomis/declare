import {Lokka} from "lokka"
import {Transport} from "lokka-transport-http"

export default new Lokka({
    transport: new Transport("/graphql")
})

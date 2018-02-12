import {Lokka} from "lokka"
import {Transport} from "lokka-transport-http"

// Cache lokka instances by token
const lokkas = {}

export default token => {
    if(!lokkas[token]) {
        lokkas[token] = new Lokka({
            transport: new Transport("/graphql", {
                headers: {
                    token
                }
            })
        })
    }

    return lokkas[token]
}

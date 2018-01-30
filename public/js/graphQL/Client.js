import {Lokka} from "lokka"
import {Transport as HttpTransport} from "lokka-transport-http"

// Cache lokka instances
const lokkas = {}

export default token => {
    if(!lokkas[token]) {
        lokkas[token] = new Lokka({
            transport: new HttpTransport("/graphql", {
                headers: {
                    token
                }
            })
        })
    }

    return lokkas[token]
}

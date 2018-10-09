/*
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
*/

import {ApolloClient}  from "apollo-client"
import {HttpLink}      from "apollo-link-http"
import {WebSocketLink} from "apollo-link-ws"
import {setContext}    from "apollo-link-context"
import {InMemoryCache} from "apollo-cache-inmemory"

const cachedClients = {}

export default (token, options={}) => {
    // Create cookie
    document.cookie = `declare_token=${token}`

    // Create links
    const authLink = setContext((_, {headers}) => ({
        headers: {
            ...headers,
            token
        }
    }))
    const netLink = (() => {
        if(options.webSocket) {
            return new WebSocketLink({
                uri: `ws://localhost:3000`,
                options: {
                    reconnect: true
                }
            })
        } else {
            return new HttpLink({uri: "/graphql"})
        }
    })()

    // Check if a valid client is already cached
    if(cachedClients[token]) {
        const cached = cachedClients[token]

        if(!!cached.options.webSocket === !!cached.options.webSocket) {
            return cached.client
        }
    }

    // Create client
    const client = new ApolloClient({
        link: authLink.concat(netLink),
        cache: new InMemoryCache()
    })

    // Cache client
    Object.assign(cachedClients, {
        [token]: {
            client, options
        }
    })

    return client
}

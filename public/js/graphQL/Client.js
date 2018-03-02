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
import {setContext}    from "apollo-link-context"
import {InMemoryCache} from "apollo-cache-inmemory"

export default token => {
    // Create cookie
    document.cookie = `declare_token=${token}`
    // Create client
    const httpLink = new HttpLink({uri: "/graphql" })
    const authLink = setContext((_, {headers}) => ({
        headers: {
            ...headers,
            token
        }
    }))

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    })
}

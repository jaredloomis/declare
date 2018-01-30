// XXX: Not actually a model! Just exports an object
//      with relevant GraphQL props (.graphQL).
//      This "model" exists only within GraphQL
import {
    GraphQLObjectType
} from "graphql"

import Account from "./Account"

const viewerGraphQL = new GraphQLObjectType({
    name: "Viewer",
    fields: {
        account: {
            type: Account.graphQL
        }
    }
})

module.exports = {
    graphQL: viewerGraphQL
}

import graphqlHTTP  from "koa-graphql"
import Router       from "koa-router"

import rootSchema   from "../schema"

module.exports = new Router()
    .all("/graphql", graphqlHTTP({
        schema: rootSchema,
        graphiql: true
    }))

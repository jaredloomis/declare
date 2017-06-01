import graphqlHTTP  from "koa-graphql"
import convert      from "koa-convert"
import Router       from "koa-router"

import rootSchema   from "../schema"

module.exports = new Router()
    .all("/graphql", convert(graphqlHTTP({
        schema: rootSchema,
        graphiql: true
    })))

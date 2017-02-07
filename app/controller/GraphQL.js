const graphql     = require("graphql")
const graphqlHTTP = require("koa-graphql")
const convert     = require("koa-convert")
const Router      = require("koa-router")

module.exports = app => {
    const router = new Router()

    router.all("/graphql", convert(graphqlHTTP({
        schema: MyGraphQLSchema,
        graphiql: true
    })))

    return router
}

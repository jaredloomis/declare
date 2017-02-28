const path        = require("path")
const fs          = require("fs")
const graphql     = require("graphql")
const graphqlHTTP = require("koa-graphql")
const convert     = require("koa-convert")
const Router      = require("koa-router")
const Page        = require("../model/Page")

const fields = {}

fs
.readdirSync(path.join(__dirname, "..", "model"))
.filter(file => file.indexOf(".") !== 0)
.forEach(file => {
    const name  = file.split(".")[0]
    const model = require(path.join(__dirname, "..", "model", file))
    fields[name] = model
})

const Query = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
        page: {
            type: new graphql.GraphQLList(Page.graphQL),
            async resolve(id) {
                if(id)
                    return await Page.findById(id)
                else
                    return await Page.find({})
            }
        }
    }
})

module.exports = app => {
    const router = new Router()

    router.all("/graphql", convert(graphqlHTTP({
        schema: new graphql.GraphQLSchema({
            query: Query
        }),
        graphiql: true
    })))

    return router
}

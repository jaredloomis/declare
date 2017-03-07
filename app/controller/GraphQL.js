import path        from "path"
import fs          from "fs"
import {
    GraphQLObjectType, GraphQLList, GraphQLString,
    GraphQLID, GraphQLNonNull, GraphQLSchema
} from "graphql"
import GraphQLJSON from "graphql-type-json"
import graphqlHTTP from "koa-graphql"
import convert     from "koa-convert"
import Router      from "koa-router"
import Page        from "../model/Page"
import TestPack    from "../model/TestPack"

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        /* Page Queries */
        pages: {
            type: new GraphQLList(Page.graphQL),
            async resolve() {
                return await Page.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        /* Page Mutations */
        createPage: {
            type: Page.graphQL,
            args: {
                name: {
                    name: "name",
                    type: new GraphQLNonNull(GraphQLString)
                },
                startURL: {
                    name: "startURL",
                    type: GraphQLString
                },
                testPacks: {
                    name: "testPacks",
                    type: new GraphQLList(GraphQLID)
                }
            },
            async resolve(obj, args) {
                return await new Page(args).save()
            }
        },
        addTestPack: {
            type: Page.graphQL,
            args: {
                pageID: {
                    name: "pageID",
                    type: new GraphQLNonNull(GraphQLID)
                },
                packID: {
                    name: "packID",
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parent, {pageID, packID}) {
                return await Page.update(
                    {_id: pageID},
                    {$addToSet: {testPacks: packID}}
                )
            }
        },
        /* TestPack Mutations */
        createTestPack: {
            type: TestPack.graphQL,
            args: {
                name: {
                    name: "name",
                    type: new GraphQLNonNull(GraphQLString)
                },
                fields: {
                    name: "fields",
                    type: new GraphQLNonNull(GraphQLJSON)
                }
            },
            async resolve(parent, args) {
                return await new TestPack(args).save()
            }
        }
    }
})

module.exports = app => {
    const router = new Router()

    router.all("/graphql", convert(graphqlHTTP({
        schema: new GraphQLSchema({
            query: Query,
            mutation: Mutation
        }),
        graphiql: true
    })))

    return router
}

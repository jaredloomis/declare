import {
    GraphQLObjectType, GraphQLList, GraphQLString,
    GraphQLID, GraphQLNonNull, GraphQLSchema
} from "graphql"
import graphqlHTTP  from "koa-graphql"
import convert      from "koa-convert"
import Router       from "koa-router"

import Page         from "../model/Page"
import TestPack     from "../model/TestPack"
import TestPackData from "../model/TestPackData"

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        /* Page Queries */
        pages: {
            type: new GraphQLList(Page.graphQL),
            async resolve() {
                return await Page.find({})
            }
        },
        page: {
            type: Page.graphQL,
            args: {
                id: {
                    name: "id",
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args) {
                return await Page.findById(args.id)
            }
        },
        /* TestPack Queries */
        testPacks: {
            type: new GraphQLList(TestPack.graphQL),
            async resolve() {
                return await TestPack.find({})
            }
        },
        testPack: {
            type: TestPack.graphQL,
            args: {
                id: {
                    name: "id",
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args) {
                return await TestPack.findById(args.id)
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
                testPackData: {
                    name: "testPackData",
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
                const data = new TestPackData({
                    testPack: packID,
                    values: {}
                })
                return await Page.findOneAndUpdate(
                    {_id: pageID},
                    {$addToSet: {testPackData: data}}
                )
            }
        },
        removeTestPack: {
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
                const page = await Page.findById(pageID)
                page.testPackData = page.testPackData.filter(dat =>
                    dat.packID.toString() !== packID.toString()
                )
                return await page.save()
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
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args) {
                args.fields = JSON.parse(args.fields)
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

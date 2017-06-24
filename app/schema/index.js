import fs   from "fs"
import path from "path"
import {
    GraphQLObjectType, GraphQLList, GraphQLString,
    GraphQLID, GraphQLNonNull, GraphQLSchema
} from "graphql"

const queryFields = fs.readdirSync(path.join(__dirname, "query"))
    .filter(file => file.indexOf(".") !== 0)
    .reduce((acc, file) => {
        const mod       = require(`./query/${file}`)
        const modFields = mod.default || mod
        return {
            ...acc,
            ...modFields
        }
    }, {})

const mutationFields = fs.readdirSync(path.join(__dirname, "mutation"))
    .filter(file => file.indexOf(".") !== 0)
    .reduce((acc, file) => {
        const mod       = require(`./mutation/${file}`)
        const modFields = mod.default || mod
        return {
            ...acc,
            ...modFields
        }
    }, {})

const subscriptionFields = fs.readdirSync(path.join(__dirname, "subscription"))
    .filter(file => file.indexOf(".") !== 0)
    .reduce((acc, file) => {
        const mod       = require(`./subscription/${file}`)
        const modFields = mod.default || mod
        return {
            ...acc,
            ...modFields
        }
    }, {})

const Query = new GraphQLObjectType({
    name: "Query",
    fields: queryFields
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: mutationFields
})

const Subscription = new GraphQLObjectType({
    name: "Subscription",
    fields: subscriptionFields
})

export default new GraphQLSchema({
    query: Query,
    mutation: Mutation
    //subscription: Subscription
})

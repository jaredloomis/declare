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

const Query = new GraphQLObjectType({
    name: "Query",
    fields: queryFields
})

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


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: mutationFields
})

export default new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

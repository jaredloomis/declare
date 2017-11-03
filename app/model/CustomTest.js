import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString,
    GraphQLID, GraphQLList, GraphQLInputObjectType
} from "graphql"

import Action from "./Action"

const customTestSchema = mongoose.Schema({
    name:    String,
    actions: [Action.schema]
})

customTestSchema.statics.graphQL = new GraphQLObjectType({
    name: "CustomTest",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        actions: {
            type: new GraphQLList(Action.graphQL)
        }
    }
})

customTestSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "CustomTestInput",
    fields: {
        name: {
            type: GraphQLString
        },
        actions: {
            type: new GraphQLList(Action.graphQLInput)
        }
    }
})

module.exports = mongoose.model("CustomTest", customTestSchema)
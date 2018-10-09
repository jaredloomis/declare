import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString,
    GraphQLList, GraphQLID, GraphQLInputObjectType
} from "graphql"
import GraphQLJSON from "graphql-type-json"

import Action from "./Action"

const ObjectId = mongoose.Schema.Types.ObjectId

const linkSchema = mongoose.Schema({
    destination: {
        type: ObjectId,
        ref: "Page",
        required: true
    },
    navigation: {
        type: [Action.schema]
    }
})

linkSchema.statics.graphQL = new GraphQLObjectType({
    name: "Link",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        destination: {
            type: new GraphQLNonNull(GraphQLID)
        },
        navigation: {
            type: new GraphQLList(Action.graphQL)
        }
    }
})

linkSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "LinkInput",
    fields: {
        destination: {
            type: new GraphQLNonNull(GraphQLID)
        },
        navigation: {
            type: new GraphQLList(Action.graphQLInput)
        }
    }
})

module.exports = mongoose.model("Link", linkSchema)

import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString,
    GraphQLID, GraphQLList, GraphQLInputObjectType
} from "graphql"

import Action from "./Action"
import Report from "./Report"

const customTestSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page"
    },
    name:    String,
    actions: [Action.schema],
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report"
    }]
})

customTestSchema.statics.graphQL = new GraphQLObjectType({
    name: "CustomTest",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        owner: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        actions: {
            type: new GraphQLList(Action.graphQL)
        },
        reports: {
            type: new GraphQLList(GraphQLID)
        }
    }
})

customTestSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "CustomTestInput",
    fields: {
        owner: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        actions: {
            type: new GraphQLList(Action.graphQLInput)
        }
    }
})

module.exports = mongoose.model("CustomTest", customTestSchema)

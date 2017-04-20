import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString,
    GraphQLID, GraphQLInputObjectType
} from "graphql"
import GraphQLJSON from "graphql-type-json"

const actionSchema = mongoose.Schema({
    actionType: {
        type: String
    },
    values: {
        type: Object
    }
})

actionSchema.statics.graphQL = new GraphQLObjectType({
    name: "Action",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        actionType: {
            type: GraphQLString
        },
        values: {
            type: GraphQLJSON
        }
    }
})

actionSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "ActionInput",
    fields: {
        actionType: {
            type: GraphQLString
        },
        values: {
            type: GraphQLString
        }
    }
})


module.exports = mongoose.model("Action", actionSchema)

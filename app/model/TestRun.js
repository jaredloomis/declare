import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID
} from "graphql"

import DateTime from "../schema/scalar/DateTime"

const ObjectId = mongoose.Schema.Types.ObjectId

const testRunSchema = mongoose.Schema({
    exact: {
        type:     String,
        required: true,
        index:    true
    }
})

testRunSchema.statics.graphQL = new GraphQLObjectType({
    name: "TestRun",
    description: "A token used to grant temporary access to resources.",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        token: {
            type: new GraphQLNonNull(GraphQLString)
        },
        expires: {
            type: new GraphQLNonNull(DateTime)
        },
        account: {
            type: new GraphQLNonNull(GraphQLID)
        },
        user: {
            type: new GraphQLNonNull(GraphQLID)
        }
    }
})

module.exports = mongoose.model("TestRun", testRunSchema)

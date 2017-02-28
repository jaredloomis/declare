import Promise from "bluebird"
import mongoose from "mongoose"
import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} from "graphql"
import GraphQLJSON from "graphql-type-json"

const testPackSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fields: {
        type: Object,
        required: true
    },
    values: {
        type: Object
    }
})

testPackSchema.statics.graphQL = new GraphQLObjectType({
    name: "TestPack",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        fields: {
            type: GraphQLJSON
        },
        values: {
            type: GraphQLJSON
        }
    }
})

const TestPack = mongoose.model("TestPack", testPackSchema)

module.exports = TestPack

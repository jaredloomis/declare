import Promise from "bluebird"
import mongoose from "mongoose"
import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID
} from "graphql"
import GraphQLJSON from "graphql-type-json"
const ObjectId = mongoose.Schema.Types.ObjectId

const testPackDataSchema = mongoose.Schema({
    testPack: {
        type: ObjectId,
        ref: "TestPack",
        index: true,
        required: true
    },
    values: {
        type: Object,
        default: {}
    },
    data: {
        type: Object
    }
})

testPackDataSchema.statics.graphQL = new GraphQLObjectType({
    name: "TestPackData",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        testPack: {
            type: new GraphQLNonNull(GraphQLID) //require("./TestPack").graphQL
        },
        values: {
            type: GraphQLJSON
        },
        data: {
            type: GraphQLJSON
        }
    }
})

const TestPackData = mongoose.model("TestPackData", testPackDataSchema)

module.exports = TestPackData

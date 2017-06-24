import Promise from "bluebird"
import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLID,
    GraphQLList
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
    },
    reports: [{
        type: ObjectId,
        ref: "Report"
    }]
})

testPackDataSchema.statics.graphQL = new GraphQLObjectType({
    name: "TestPackData",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        testPack: {
            type: new GraphQLNonNull(GraphQLID)
        },
        values: {
            type: GraphQLJSON
        },
        data: {
            type: GraphQLJSON
        },
        reports: {
            type: new GraphQLList(GraphQLID)
        }
    }
})

const TestPackData = mongoose.model("TestPackData", testPackDataSchema)

module.exports = TestPackData

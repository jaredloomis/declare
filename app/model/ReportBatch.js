import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLID,
    GraphQLList
} from "graphql"

const ObjectId = mongoose.Schema.Types.ObjectId

const reportBatchSchema = mongoose.Schema({
    testRun: {
        type: ObjectId,
        ref: "TestRun"
    },
    reports: {
        type: [{
            type: ObjectId,
            ref: "Report"
        }]
    },
    owner: {
        type: ObjectId,
        ref: "Account",
        required: true
    }
})

reportBatchSchema.statics.graphQL = new GraphQLObjectType({
    name: "ReportBatch",
    description: "A collection of reports produced by executing a TestRun.",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        testRun: {
            type: new GraphQLNonNull(GraphQLID)
        },
        reports: {
            type: new GraphQLList(GraphQLID)
        },
        owner: {
            type: new GraphQLNonNull(GraphQLID)
        }
    }
})

module.exports = mongoose.model("ReportBatch", reportBatchSchema)

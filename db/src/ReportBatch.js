import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLID,
    GraphQLList, GraphQLString, GraphQLFloat
} from "graphql"

import Report, {Status} from "./Report"

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
    startTime: {
        type: Date
    },
    passPercentage: {
        type: Number
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
        startTime: {
            type: GraphQLString
        },
        passPercentage: {
            type: GraphQLFloat
        },
        owner: {
            type: new GraphQLNonNull(GraphQLID)
        }
    }
})

reportBatchSchema.pre("save", async function() {
    // Set .startTime
    if(!this.startTime && this.reports.length) {
        const reportID = this.reports[0]
        const {startTime} = await Report.findById(reportID)
        this.startTime = startTime
    }

    // Set .passPercentage
    if(!this.passPercentage && this.reports.length) {
        const reports = await Report.find({
            "_id": {
                $in: this.reports.map(mongoose.Types.ObjectId)
            }
        })
        this.passPercentage = 100 * reports.reduce((acc, report) =>
            acc + (report.status === Status.PASS ? 1 : 0)
        , 0) / reports.length
    }
})

module.exports = mongoose.model("ReportBatch", reportBatchSchema)

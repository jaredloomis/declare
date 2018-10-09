import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID,
    GraphQLList, GraphQLInputObjectType, GraphQLFloat
} from "graphql"
import GraphQLJSON from "graphql-type-json"

import ReportBatch from "./ReportBatch"
import {Status}    from "../worker/executor/Report"

const ObjectId = mongoose.Schema.Types.ObjectId

const testRunSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    /**
     * A list of tests of the form:
     *
     * > {
     * >   testType: "customtest" | "testpack" | "external" | ...
     * >   other_fields_here...
     * > }
     *
     * For example:
     *
     * > {
     * >   testType: "customTest"
     * >   customTestID: "hbsdf78323hb34r"
     * > }
     *
     */
    tests: {
        type: Object,
        default: []
    },
    reportBatches: {
        type: [{
            type: ObjectId,
            ref: "ReportBatch"
        }],
        default: []
    },
    environment: {
        type: ObjectId,
        ref: "Environment",
        required: true
    },
    owner: {
        type: ObjectId,
        ref: "Account",
        required: true
    }
})

const testReference = new GraphQLObjectType({
    name: "TestReference",
    description: "A reference to some kind of test.",
    fields: {
        testType: {
            type: new GraphQLNonNull(GraphQLString)
        },
        customTestID: {
            type: GraphQLID
        }
    }

})

testRunSchema.statics.graphQL = new GraphQLObjectType({
    name: "TestRun",
    description: "A collection of tests that can be run as a batch.",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: new GraphQLNonNull(GraphQLString)
        },
        tests: {
            type: new GraphQLList(testReference)
        },
        reportBatches: {
            type: new GraphQLList(GraphQLID)
        },
        environment: {
            type: new GraphQLNonNull(GraphQLID)
        },
        owner: {
            type: new GraphQLNonNull(GraphQLID)
        }
    }
})

testRunSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "TestRunInput",
    fields: {
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        tests: {
            type: new GraphQLList(GraphQLJSON)
        },
        reportBatches: {
            type: new GraphQLList(GraphQLID)
        },
        environment: {
            type: GraphQLID
        },
        owner: {
            type: GraphQLID
        }
    }
})

testRunSchema.statics.testTypes = {
    CUSTOM_TEST: "customtest"
}

module.exports = mongoose.model("TestRun", testRunSchema)

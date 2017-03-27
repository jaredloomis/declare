import Promise from "bluebird"
import mongoose from "mongoose"
import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID
} from "graphql"

import TestPackData from "./TestPackData"

const ObjectId = mongoose.Schema.Types.ObjectId

const pageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startURL: {
        type: String
    },
    testPackData: {
        type: [TestPackData.schema]
    }
})

pageSchema.statics.graphQL = new GraphQLObjectType({
    name: "Page",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        startURL: {
            type: GraphQLString
        },
        testPackData: {
            type: new GraphQLList(TestPackData.graphQL)
        }
    }
})

module.exports = mongoose.model("Page", pageSchema)

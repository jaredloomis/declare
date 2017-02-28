import Promise from "bluebird"
import mongoose from "mongoose"
import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} from "graphql"
const ObjectId = mongoose.Schema.Types.ObjectId

const pageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startURL: {
        type: String
    },
    testPacks: {
        type: ObjectId,
        ref: "TestPack"
    }
})

pageSchema.statics.graphQL = new GraphQLObjectType({
    name: "Page",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        startURL: {
            type: GraphQLString
        },
        testPacks: {
            type: require("./TestPack").graphQL
        }
    }
})

module.exports = mongoose.model("Page", pageSchema)

import Promise from "bluebird"
import mongoose from "mongoose"
import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
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
        type: [ObjectId],
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
            type: new GraphQLNonNull(GraphQLString)
        },
        startURL: {
            type: GraphQLString
        },
        testPacks: {
            type: new GraphQLList(
                new GraphQLNonNull(GraphQLID)
                //require("./TestPack").graphQL
            )
        }
    }
})

module.exports = mongoose.model("Page", pageSchema)

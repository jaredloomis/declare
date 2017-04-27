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
import Link         from "./Link"

const ObjectId = mongoose.Schema.Types.ObjectId

const pageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startURL: {
        type: String
    },
    identifier: {
        type: String
    },
    links: {
        type: [Link.schema]
    },
    testPackData: {
        type: [TestPackData.schema]
    }
})

pageSchema.methods.updateLink = function(linkID, linkData) {
    this.links = this.links.map(link =>
        link._id.toString() === linkID.toString() ?
            Object.assign({}, linkData, link) :
            link
    )
}

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
        identifier: {
            type: GraphQLString
        },
        links: {
            type: new GraphQLList(Link.graphQL)
        },
        testPackData: {
            type: new GraphQLList(TestPackData.graphQL)
        }
    }
})

module.exports = mongoose.model("Page", pageSchema)

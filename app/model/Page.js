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
    },
    reports: [{
        type: ObjectId,
        ref: "Report"
    }]
})

pageSchema.methods.setPackData = function(packID, data) {
    Object.keys(data).forEach(key =>
        this.setPackDatum(packID, key, data[key])
    )
}

pageSchema.methods.setPackDatum = function(packID, name, value) {
    this.testPackData = this.testPackData.map(packFull => {
        const pack = packFull.toObject()
        if(pack.testPack.toString() === packID) {
            return {
                ...pack,
                data: {
                    ...pack.data,
                    [name]: value
                }
            }
        } else {
            return pack
        }
    })
}

pageSchema.methods.getPackData = function(packID) {
    return this.testPackData
        .filter(pack => pack.testPack.toString() === packID)[0]
        .data
}

pageSchema.methods.updateLink = function(linkID, linkData) {
    this.links = this.links.map(link =>
        link._id.toString() === linkID.toString() ?
            Object.assign({}, linkData, link) :
            link
    )
}

/**
 * Find a value in any TestPack on Page
 */
pageSchema.methods.findPackValue = function(key) {
    for(const pack in this.testPackData.reduce) {
        if(pack.values[key])
            return pack.values[key]
    }
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
        },
        reports: {
            type: new GraphQLList(GraphQLID)
        }
    }
})

module.exports = mongoose.model("Page", pageSchema)

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

pageSchema.methods.addReport = function(packID, reportID) {
    for(let i = 0; i < this.testPackData.length; ++i) {
        const datum = this.testPackData[i]
        if(datum.testPack.toString() === packID) {
            this.testPackData[i].reports.push(reportID)
        }
    }
}

pageSchema.methods.setPackData = function(packID, data) {
    if(data) {
        Object.keys(data).forEach(key =>
            this.setPackDatum(packID, key, data[key])
        )
    }
}

pageSchema.methods.setPackDatum = function(packID, name, value) {
    for(let i = 0; i < this.testPackData.length; ++i) {
        const pack = this.testPackData[i]
        if(pack.testPack.toString() === packID) {
            if(!this.testPackData[i].data) {
                this.testPackData[i].data = {}
            }
            this.testPackData[i].data[name] = value
            return
        }
    }
}

pageSchema.methods.getPackData = function(packID) {
    return this.testPackData
        .filter(pack => pack.testPack.toString() === packID)[0]
        .data
}

pageSchema.methods.updateLink = function(linkID, linkData) {
    for(const link of this.links) {
        if(link._id.toString() === linkID.toString()) {
            Object.assign(link, linkData)
            return
        }
    }
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
        }
    }
})

module.exports = mongoose.model("Page", pageSchema)

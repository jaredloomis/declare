import mongoose from "mongoose"
import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInputObjectType
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
    customTests: {
        type: [{
            type: ObjectId,
            ref: "CustomTest"
        }]
    },
    testValues: {
        type: [{
            type: ObjectId,
            ref: "TestValue"
        }]
    },
    product: {
        type: ObjectId,
        ref: "Product",
        required: true
    },
    owner: {
        type: ObjectId,
        ref: "Account",
        required: true
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
        identifier: {
            type: GraphQLString
        },
        links: {
            type: new GraphQLList(Link.graphQL)
        },
        testPackData: {
            type: new GraphQLList(TestPackData.graphQL)
        },
        customTests: {
            type: new GraphQLList(GraphQLID)
        },
        testValues: {
            type: new GraphQLList(GraphQLID)
        },
        product: {
            // XXX Should be non-null. Temporarily allowing null
            // for testing purposes
            type: GraphQLID
        },
        owner: {
            type: new GraphQLNonNull(GraphQLID)
        }
    }
})

pageSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "PageInput",
    fields: {
        name: {
            type: GraphQLString
        },
        startURL: {
            type: GraphQLString
        },
        identifier: {
            type: GraphQLString
        },
        product: {
            type: GraphQLID
        }
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
    if(typeof linkID !== "string") linkID = linkID.toString()
    for(const link of this.links) {
        // ObjectId comparison isn't working here
        if(link._id.toString() === linkID) {
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

module.exports = mongoose.model("Page", pageSchema)

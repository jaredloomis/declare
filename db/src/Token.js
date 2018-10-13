import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID
} from "graphql"

import DateTime from "./DateTime"

const ObjectId = mongoose.Schema.Types.ObjectId

const tokenSchema = mongoose.Schema({
    token: {
        type:     String,
        required: true,
        index:    true
    },
    // ISO String
    expires: {
        type:     String,
        required: true
    },
    account: {
        type:     ObjectId,
        required: true,
        ref:      "Account"
    },
    user: {
        type:     ObjectId,
        required: true,
        ref:      "User"
    }
})

tokenSchema.statics.graphQL = new GraphQLObjectType({
    name: "Token",
    description: "A token used to grant temporary access to resources.",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        token: {
            type: new GraphQLNonNull(GraphQLString)
        },
        expires: {
            type: new GraphQLNonNull(DateTime)
        },
        account: {
            type: new GraphQLNonNull(GraphQLID)
        },
        user: {
            type: new GraphQLNonNull(GraphQLID)
        }
    }
})

// TODO real token generation
tokenSchema.statics.rawToken = function() {
    return Math.random() + ""
}

tokenSchema.methods.isExpired = function() {
    const now      = new Date()
    const expValid = !isNaN(Date.parse(this.expires))
    const exp      = new Date(this.expires)

    if(!expValid) {
        return true
    } else {
        return now.getTime() > exp.getTime()
    }
}

tokenSchema.methods.refresh = function(delta) {
    this.expires = new Date(new Date().getTime() + delta)
}

module.exports = mongoose.model("Token", tokenSchema)

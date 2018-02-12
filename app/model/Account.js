import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLInputObjectType,
    GraphQLNonNull, GraphQLID, GraphQLList
} from "graphql"

import User from "./User"

const ObjectId = mongoose.Schema.Types.ObjectId

const accountSchema = mongoose.Schema({
    users: [{
        type: ObjectId,
        ref:  "User"
    }],
    pageCategories: [{
        type: ObjectId,
        ref: "Page"
    }],
    elementCategories: [{
        type: ObjectId,
        ref: "Element"
    }],
    inputTypeCategories: [{
        type: ObjectId,
        ref: "InputType"
    }]
})

accountSchema.statics.graphQL = new GraphQLObjectType({
    name: "Account",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        users: {
            type: new GraphQLList(GraphQLID)
        },
        pageCategories: {
            type: new GraphQLList(GraphQLID)
        },
        elementCategories: {
            type: new GraphQLList(GraphQLID)
        },
        inputTypeCategories: {
            type: new GraphQLList(GraphQLID)
        }
    }
})

accountSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "AccountInput",
    fields: {
        users: {
            type: new GraphQLList(GraphQLID)
        },
        pageCategories: {
            type: new GraphQLList(GraphQLID)
        },
        elementCategories: {
            type: new GraphQLList(GraphQLID)
        },
        inputTypeCategories: {
            type: new GraphQLList(GraphQLID)
        }
    }
})

accountSchema.statics.containingUser = function(userID) {
    return this.find({users: userID})
}

accountSchema.methods.containsUser = function(userID) {
    // Clean arg
    if(userID._id) {
        const user = userID
        userID = user._id
        // SuperAdmin is "in" every account
        if(user.role === User.roles.superAdmin) {
            return true
        }
    }
    const userIDNorm = userID.toString()
    for(const user of this.users) {
        if(user.toString() === userIDNorm)
            return true
    }
    return false
}

module.exports = mongoose.model("Account", accountSchema)

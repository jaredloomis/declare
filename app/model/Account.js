import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLInputObjectType,
    GraphQLNonNull, GraphQLID, GraphQLList
} from "graphql"

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

module.exports = mongoose.model("Account", accountSchema)

import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID,
    GraphQLInputObjectType
} from "graphql"

const elementSchema = mongoose.Schema({
    name: {
        type: String
    },
    selector: {
        type: String,
        required: true
    },
    inputType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InputType"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    }
})

elementSchema.statics.graphQL = new GraphQLObjectType({
    name: "Element",
    description: "A description of an element on a web page",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        selector: {
            type: new GraphQLNonNull(GraphQLString)
        },
        inputType: {
            type: GraphQLID
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

elementSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "ElementInput",
    description: "",
    fields: {
        name: {
            type: GraphQLString
        },
        selector: {
            type: GraphQLString
        },
        product: {
            type: GraphQLID
        },
        inputType: {
            type: GraphQLID
        }
    }
})

module.exports = mongoose.model("Element", elementSchema)

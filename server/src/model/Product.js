import mongoose    from "mongoose"
import {
    GraphQLObjectType, GraphQLInputObjectType,
    GraphQLList, GraphQLString, GraphQLID,
    GraphQLNonNull
} from "graphql"

const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pageCategories: {
        type: [{
            type: ObjectId,
            ref: "Category"
        }],
        default: []
    },
    elementCategories: {
        type: [{
            type: ObjectId,
            ref: "Category"
        }],
        default: []
    },
    inputTypeCategories: {
        type: [{
            type: ObjectId,
            ref: "Category"
        }],
        default: []
    },
    defaultEnvironment: {
        type: ObjectId,
        ref: "Environment",
        required: true
    },
    owner: {
        type: ObjectId,
        ref: "Account"
    }
})

productSchema.statics.graphQL = new GraphQLObjectType({
    name: "Product",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        pageCategories: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLID))
        },
        elementCategories: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLID))
        },
        inputTypeCategories: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLID))
        },
        defaultEnvironment: {
            type: new GraphQLNonNull(GraphQLID)
        },
        owner: {
            type: GraphQLID
        }
    }
})

productSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "ProductInput",
    fields: {
        name: {
            type: GraphQLString
        },
        pageCategories: {
            type: new GraphQLList(GraphQLID)
        },
        elementCategories: {
            type: new GraphQLList(GraphQLID)
        },
        inputTypeCategories: {
            type: new GraphQLList(GraphQLID)
        },
        defaultEnvironment: {
            type: GraphQLID
        }
    }
})

module.exports = mongoose.model("Product", productSchema)

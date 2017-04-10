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

const linkSchema = mongoose.Schema({
    from: {
        type: ObjectId,
        ref: "Page",
        required: true
    },
    to: {
        type: ObjectId,
        ref: "Page",
        required: true
    },
    action: {
        type: {
        
        },
        required: true
    }
})

linkSchema.statics.graphQL = new GraphQLObjectType({
    name: "Link",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        from: {
            type: new GraphQLNonNull(GraphQLID)
        },
        to: {
            type: new GraphQLNonNull(GraphQLID)
        }
    }
})

module.exports = mongoose.model("Link", linkSchema)

import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID
} from "graphql"

const testValueSchema = mongoose.Schema({
    name: {
        type: String
    },
    selector: {
        type: String
    }
})

testValueSchema.statics.graphQL = new GraphQLObjectType({
    name: "TestValue",
    description: "A value that can be used in CustomTests",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        selector: {
            type: GraphQLString
        }
    }
})

module.exports = mongoose.model("TestValue", testValueSchema)

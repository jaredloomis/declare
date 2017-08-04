import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
    GraphQLID, GraphQLInt, GraphQLUnionType, GraphQLInputObjectType
} from "graphql"

const constraintSchema = mongoose.Schema({
    regex: String,
    minLength: Number,
    maxLength: Number
})

const inputTypeSchema = mongoose.Schema({
    name: String,
    constraints: [constraintSchema]
})

/*
 * GraphQL
 */

const constraintGraphQLFields = {
    // Regex constraint
    regex: {type: GraphQLString},
    // Length constraint
    minLength: {type: GraphQLInt},
    maxLength: {type: GraphQLInt}
}

inputTypeSchema.statics.graphQL = new GraphQLObjectType({
    name: "InputType",
    description: "",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        constraints: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "Constraint",
                fields: constraintGraphQLFields
            }))
        }
    }
})

inputTypeSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "InputTypeInput",
    description: "",
    fields: {
        name: {
            type: GraphQLString
        },
        constraints: {
            type: new GraphQLList(new GraphQLInputObjectType({
                name: "ConstraintInput",
                description: "",
                fields: constraintGraphQLFields
            }))
        }
    }
})

module.exports = mongoose.model("InputType", inputTypeSchema)

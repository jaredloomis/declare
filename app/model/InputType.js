// @flow
import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,
    GraphQLID, GraphQLInt, GraphQLInputObjectType
} from "graphql"

export type ConstraintTy =
    {exact: string} | {regex: string} |
    {minLength: ?number, maxLength: ?number}

const constraintSchema = mongoose.Schema({
    exact: String,
    regex: String,
    minLength: Number,
    maxLength: Number
})

const inputTypeSchema = mongoose.Schema({
    name: String,
    constraints: [constraintSchema]
})

inputTypeSchema.methods.randomInput = function() {
    // TODO CREATE A COMPREHENSIVE GENERATOR
    const tmp = this.constraints[0]
    if(tmp.regex) {
        return "regex"
    } else if(tmp.minLength || tmp.maxLength) {
        return "length"
    }
}

/*
 * GraphQL
 */

const constraintGraphQLFields = {
    // Exact constraint
    exact: {type: GraphQLString},
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

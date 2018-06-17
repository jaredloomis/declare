import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID,
    GraphQLInputObjectType, GraphQLList
} from "graphql"

const environmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    variables: {
        type: [{
            identifier: String,
            value:      String
        }],
        default: []
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    }
})

environmentSchema.statics.graphQL = new GraphQLObjectType({
    name: "Environment",
    description: "A collection of information describing an environment for a website.",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString
        },
        variables: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "Variable",
                description: "A key value pair.",
                fields: {
                    _id: {
                        type: new GraphQLNonNull(GraphQLID)
                    },
                    identifier: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    value: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                }
            }))
        },
        owner: {
            type: new GraphQLNonNull(GraphQLID)
        }
    }
})

environmentSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "EnvironmentInput",
    description: "",
    fields: {
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        variables: {
            type: new GraphQLList(new GraphQLInputObjectType({
                name: "VariableInput",
                description: "A key value pair.",
                fields: {
                    identifier: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    value: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                }
            }))
        },
        owner: {
            type: GraphQLID
        }
    }
})

module.exports = mongoose.model("Environment", environmentSchema)

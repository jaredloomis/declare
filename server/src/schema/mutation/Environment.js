import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import EnvironmentModel  from "../../model/Environment"
import EnvironmentAccess from "../../access/Environment"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createEnvironment: {
        type: CanError(EnvironmentModel.graphQL),
        args: {
            environment: {
                type: EnvironmentModel.graphQLInput
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                EnvironmentAccess.createEnvironment(args, {user: state.user})
            )
        }
    },
    updateEnvironment: {
        type: CanError(EnvironmentModel.graphQL),
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            environment: {
                type: EnvironmentModel.graphQLInput
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                EnvironmentAccess.updateEnvironment(args, {user: state.user})
            )
        }
    },
    removeEnvironment: {
        type: CanError(EnvironmentModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(object, args, {state}) {
            return wrapExceptional(() =>
                EnvironmentAccess.removeEnvironment(args, {user: state.user})
            )
        }
    }
}

import {
    GraphQLID, GraphQLNonNull, GraphQLList
} from "graphql"

import {Environment as EnvironmentModel}  from "declare-db"
import EnvironmentAccess from "../../access/Environment"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    environments: {
        type: CanError(new GraphQLList(EnvironmentModel.graphQL), {name: "List_Environment_CanError"}),
        resolve(parent, args, {state}) {
            return wrapExceptional(() => EnvironmentAccess.environments({user: state.user}))
        }
    },
    environment: {
        type: CanError(EnvironmentModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, {id}, {state}) {
            return wrapExceptional(() => EnvironmentAccess.environment({id}, {user: state.user}))
        }
    }
}

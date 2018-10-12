import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import {User as UserModel}  from "declare-db"
import UserAccess from "../../access/User"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createUser: {
        type: CanError(UserModel.graphQL),
        args: {
            user: {
                type: new GraphQLNonNull(UserModel.graphQLInput)
            }
        },
        resolve(_parent, args, {state}) {
            return wrapExceptional(() =>
                UserAccess.createUser(args, {user: state.user})
            )
        }
    },
    updateUser: {
        type: CanError(UserModel.graphQL),
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            user: {
                type: new GraphQLNonNull(UserModel.graphQLInput)
            }
        },
        resolve(_parent, args, {state}) {
            return wrapExceptional(() =>
                UserAccess.updateUser(args, {user: state.user})
            )
        }
    },
    removeUser: {
        type: CanError(UserModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(object, args, {state}) {
            return wrapExceptional(() =>
                UserAccess.removeUser(args, {user: state.user})
            )
        }
    }
}

import {
    GraphQLID, GraphQLNonNull, GraphQLList
} from "graphql"

import CanError from "../GraphQLCanError"

import UserModel  from "../../model/User"
import UserAccess from "../../access/User"

export default {
    users: {
        type: CanError(new GraphQLList(UserModel.graphQL), {name: "List_User_CanError"}),
        async resolve(parent, args, {state}) {
            try {
                return {
                    data: await UserAccess.users({user: state.user})
                }
            } catch(ex) {
                return {error: ex}
            }
        }
    },
    user: {
        type: CanError(UserModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, args, {state}) {
            try {
                return {
                    data: await UserAccess.user(args, {user: state.user})
                }
            } catch(ex) {
                return {error: ex}
            }
        }
    }
}

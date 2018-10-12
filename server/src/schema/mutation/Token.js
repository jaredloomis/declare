import {
    GraphQLNonNull, GraphQLID, GraphQLString
} from "graphql"

import {Token as TokenModel}  from "declare-db"
import TokenAccess from "../../access/Token"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createToken: {
        type: CanError(TokenModel.graphQL),
        args: {
            account: {
                name: "account",
                type: GraphQLID
            },
            email: {
                name: "email",
                type: GraphQLString
            },
            password: {
                name: "password",
                type: GraphQLString
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                TokenAccess.createToken(args, {user: state.user})
            )
        }
    }
}

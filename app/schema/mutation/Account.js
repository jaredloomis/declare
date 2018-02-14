import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import AccountModel  from "../../model/Account"
import AccountAccess from "../../access/Account"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createAccount: {
        type: CanError(AccountModel.graphQL),
        args: {
            account: {
                type: new GraphQLNonNull(AccountModel.graphQLInput)
            }
        },
        resolve(_parent, {account}) {
            return wrapExceptional(() =>
                AccountAccess.createAccount({account})
            )
        }
    },
    updateAccount: {
        type: CanError(AccountModel.graphQL),
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            account: {
                type: new GraphQLNonNull(AccountModel.graphQLInput)
            }
        },
        resolve(_parent, {id, account}, {state}) {
            return wrapExceptional(() =>
                AccountAccess.updateAccount({id, account}, {user: state.user})
            )
        }
    },
    removeAccount: {
        type: CanError(AccountModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(object, {id}, {state}) {
            return wrapExceptional(() =>
                AccountAccess.removeAccount({id}, {user: state.user})
            )
        }
    },
    // Assign a User to an Account
    assignUser: {
        type: CanError(AccountModel.graphQL),
        args: {
            accountID: {
                name: "accountID",
                type: new GraphQLNonNull(GraphQLID)
            },
            userID: {
                name: "userID",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_parent, {accountID, userID}, {state}) {
            return wrapExceptional(() =>
                AccountAccess.assignUser({accountID, userID}, {user: state.user})
            )
        }
    }
}

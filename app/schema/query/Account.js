import {
    GraphQLID, GraphQLNonNull, GraphQLList, GraphQLException
} from "graphql"

import CanError from "../GraphQLCanError"

import AccountModel  from "../../model/Account"
import AccountAccess from "../../access/Account"

export default {
    accounts: {
        type: CanError(new GraphQLList(AccountModel.graphQL), {name: "List_Account_CanError"}),
        async resolve(parent, args, {state}) {
            try {
                return {
                    data: await AccountAccess.accounts({user: state.user})
                }
            } catch(ex) {
                return {error: ex}
            }
        }
    },
    account: {
        type: CanError(AccountModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, {id}, {state}) {
            try {
                return {
                    data: await AccountAccess.account({id}, {user: state.user})
                }
            } catch(ex) {
                return {error: ex}
            }
        }
    }
}

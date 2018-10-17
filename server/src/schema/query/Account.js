import {
    GraphQLID, GraphQLList
} from "graphql"

import CanError from "../GraphQLCanError"

import {Account as AccountModel}  from "declare-db"
import AccountAccess from "../../access/Account"

console.log("MODEL", AccountModel)
console.log("GQL", AccountModel.graphQL, typeof AccountModel.graphQL, JSON.stringify(AccountModel.graphQL), Object.keys(AccountModel.graphQL))

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
                type: GraphQLID
            }
        },
        async resolve(parent, {id}, {state}) {
            try {
                if(id) {
                    return {
                        data: await AccountAccess.account({id}, {user: state.user})
                    }
                } else {
                    return {
                        data: await AccountAccess.account({id: state.user.owner}, {user: state.user})
                    }
                }
            } catch(ex) {
                return {error: ex}
            }
        }
    }
}

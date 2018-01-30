import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import logger  from "../../common/Logger"
import Account from "../../model/Account"
import User    from "../../model/User"

export default {
    createAccount: {
        type: Account.graphQL,
        args: {
            account: {
                type: new GraphQLNonNull(Account.graphQLInput)
            }
        },
        async resolve(_parent, {account}) {
            try {
                return await new Account(account).save()
            } catch(ex) {
                console.log(ex)
                logger.log("error", "Error while creating Account", ex)
                return ex
            }
        }
    },
    updateAccount: {
        type: Account.graphQL,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            account: {
                type: new GraphQLNonNull(Account.graphQLInput)
            }
        },
        async resolve(_parent, {id, account}) {
            try {
                return await Account.findByIdAndUpdate(id, account)
            } catch(ex) {
                console.log(ex)
                logger.log("error", "Error while creating Category", ex)
                return ex
            }
        }
    },
    removeAccount: {
        type: Account.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(object, {id}) {
            return await Account.findByIdAndRemove(id)
        }
    },
    // Assign a User to an Account
    assignUser: {
        type: Account.graphQL,
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
        async resolve(_parent, {accountID, userID}) {
            return await Account.findByIdAndUpdate(
                accountID,
                {$addToSet: {users: userID}}
            )
        }
    }
}

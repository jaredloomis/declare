import {
    GraphQLID, GraphQLNonNull, GraphQLList
} from "graphql"

import Account from "../../model/Account"

export default {
    accounts: {
        type: new GraphQLList(Account.graphQL),
        async resolve(parent, args) {
            return await Account.find({})
        }
    },
    account: {
        type: Account.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, {id}) {
            return await Account.findById(id)
        }
    }
}

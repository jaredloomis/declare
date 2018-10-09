import {
    GraphQLString, GraphQLError
} from "graphql"

import Viewer  from "../../model/Viewer"
import Account from "../../model/Account"
import Token   from "../../model/Token"

export default {
    viewer: {
        type: Viewer.graphQL,
        args: {
            token: {
                name: "token",
                type: GraphQLString
            }
        },
        async resolve(parent, {token}) {
            const tokenModel = await Token.findOne({token})

            if(tokenModel && tokenModel.token) {
                if(!tokenModel.isExpired()) {
                    return {
                        account: await Account.findById(tokenModel.account)
                    }
                } else {
                    // Expired tokens can be deleted
                    await tokenModel.remove()
                    throw new GraphQLError(`Token "${token}" is expired. Deleting.`)
                }
            }
            throw new GraphQLError(`Token "${token}" is invalid or expired.`)
        }
    }
}

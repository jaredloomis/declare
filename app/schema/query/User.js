import {
    GraphQLID, GraphQLNonNull, GraphQLList
} from "graphql"

import User from "../../model/User"

export default {
    users: {
        type: new GraphQLList(User.graphQL),
        async resolve(parent, args) {
            return await User.find({})
        }
    },
    user: {
        type: User.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, {id}, {state}) {
            return await User.findById(id)
        }
    }
}

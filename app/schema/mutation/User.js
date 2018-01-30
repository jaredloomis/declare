import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import logger from "../../common/Logger"
import User   from "../../model/User"

export default {
    createUser: {
        type: User.graphQL,
        args: {
            user: {
                type: new GraphQLNonNull(User.graphQLInput)
            }
        },
        async resolve(_parent, {user}) {
            try {
                return await new User(user).save()
            } catch(ex) {
                console.log(ex)
                logger.log("error", "Error while creating User", ex)
                return ex
            }
        }
    },
    updateUser: {
        type: User.graphQL,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            user: {
                type: new GraphQLNonNull(User.graphQLInput)
            }
        },
        async resolve(_parent, {id, user}) {
            try {
                return await User.findByIdAndUpdate(id, user)
            } catch(ex) {
                console.log(ex)
                logger.log("error", "Error while creating Category", ex)
                return ex
            }
        }
    },
    removeUser: {
        type: User.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(object, {id}) {
            return await User.findByIdAndRemove(id)
        }
    }
}

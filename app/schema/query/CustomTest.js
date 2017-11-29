import {
    GraphQLID, GraphQLNonNull, GraphQLList
} from "graphql"

import CustomTest from "../../model/CustomTest"

export default {
    customTests: {
        type: new GraphQLList(CustomTest.graphQL),
        async resolve(parent, args) {
            return await CustomTest.find({})
        }
    },
    customTest: {
        type: CustomTest.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, {id}) {
            return await CustomTest.findById(id)
        }
    }
}

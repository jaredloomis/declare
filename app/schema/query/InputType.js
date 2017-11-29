import {GraphQLList, GraphQLID, GraphQLNonNull} from "graphql"

import InputType from "../../model/InputType"

export default {
    inputTypes: {
        type: new GraphQLList(InputType.graphQL),
        async resolve(parent) {
            return await InputType.find({})
        }
    },
    inputType: {
        type: InputType.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, {id}) {
            return await InputType.findById(id)
        }
    }
}

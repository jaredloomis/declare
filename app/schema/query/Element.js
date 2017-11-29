import {
    GraphQLID, GraphQLNonNull, GraphQLList
} from "graphql"

import Element from "../../model/Element"

export default {
    elements: {
        type: new GraphQLList(Element.graphQL),
        async resolve(parent, args) {
            return await Element.find({})
        }
    },
    element: {
        type: Element.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, {id}) {
            return await Element.findById(id)
        }
    }
}

import {
    GraphQLID, GraphQLNonNull, GraphQLList
} from "graphql"

import Category from "../../model/Category"

export default {
    categories: {
        type: new GraphQLList(Category.graphQL),
        async resolve(parent, args) {
            return await Category.find({})
        }
    },
    category: {
        type: Category.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, {id}) {
            return await Category.findById(id)
        }
    }
}

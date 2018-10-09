import {
    GraphQLID, GraphQLNonNull, GraphQLList
} from "graphql"

import CanError       from "../GraphQLCanError"
import CategoryModel  from "../../model/Category"
import CategoryAccess from "../../access/Category"

export default {
    categories: {
        type: CanError(new GraphQLList(CategoryModel.graphQL), {name: "List_Category_CanError"}),
        async resolve(parent, args, {state}) {
            try {
                return {
                    data: await CategoryAccess.categories({user: state.user})
                }
            } catch(ex) {
                return {error: ex}
            }
        }
    },
    category: {
        type: CanError(CategoryModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, {id}) {
            try {
                return {
                    data: await CategoryModel.findById(id)
                }
            } catch(ex) {
                return {error: ex}
            }
        }
    }
}

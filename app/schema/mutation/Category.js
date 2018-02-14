import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import CategoryModel  from "../../model/Category"
import CategoryAccess from "../../access/Category"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createCategory: {
        type: CanError(CategoryModel.graphQL),
        args: {
            category: {
                type: new GraphQLNonNull(CategoryModel.graphQLInput)
            }
        },
        resolve(_parent, {category}, {state}) {
            return wrapExceptional(() =>
                CategoryAccess.createCategory({category}, {user: state.user})
            )
        }
    },
    updateCategory: {
        type: CanError(CategoryModel.graphQL),
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            category: {
                type: new GraphQLNonNull(CategoryModel.graphQLInput)
            }
        },
        resolve(_parent, {id, category}, {state}) {
            return wrapExceptional(() =>
                CategoryAccess.updateCategory({id, category}, {user: state.user})
            )
        }
    },
    removeCategory: {
        type: CanError(CategoryModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(object, {id}, {state}) {
            return wrapExceptional(() =>
                CategoryAccess.removeCategory({id}, {user: state.user})
            )
        }
    }
}

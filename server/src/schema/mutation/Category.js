import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import {Category as CategoryModel}  from "declare-db"
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
    },
    addItemToCategory: {
        type: CanError(CategoryModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            },
            itemID: {
                name: "itemID",
                type: new GraphQLNonNull(GraphQLID)
            },
        },
        resolve(object, args, {state}) {
            return wrapExceptional(() =>
                CategoryAccess.addItemToCategory(args, {user: state.user})
            )
        }
    },
    removeItemFromCategory: {
        type: CanError(CategoryModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            },
            itemID: {
                name: "itemID",
                type: new GraphQLNonNull(GraphQLID)
            },
        },
        resolve(object, args, {state}) {
            return wrapExceptional(() =>
                CategoryAccess.removeItemFromCategory(args, {user: state.user})
            )
        }
    }
}

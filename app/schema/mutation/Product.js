import {
    GraphQLNonNull, GraphQLID
} from "graphql"

import ProductModel  from "../../model/Product"
import ProductAccess from "../../access/Product"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createProduct: {
        type: CanError(ProductModel.graphQL),
        args: {
            product: {
                type: new GraphQLNonNull(ProductModel.graphQLInput)
            }
        },
        resolve(_parent, {product}, {state}) {
            return wrapExceptional(() =>
                ProductAccess.createProduct({product}, {user: state.user})
            )
        }
    },
    addCategoryToProduct: {
        type: CanError(ProductModel.graphQL),
        args: {
            productID: {
                type: new GraphQLNonNull(GraphQLID)
            },
            categoryID: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_parent, args, {state}) {
            return wrapExceptional(() =>
                ProductAccess.addCategory(args, {user: state.user})
            )
        }
    }
}

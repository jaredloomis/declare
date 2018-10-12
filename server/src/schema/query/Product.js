import {GraphQLList, GraphQLID, GraphQLNonNull} from "graphql"

import {Product as ProductModel}  from "declare-db"
import ProductAccess from "../../access/Product"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    products: {
        type: CanError(new GraphQLList(ProductModel.graphQL), {name: "List_Product_CanError"}),
        resolve(parent, {pageID}, {state}) {
            return wrapExceptional(() =>
                ProductAccess.products({user: state.user})
            )
        }
    },
    product: {
        type: CanError(ProductModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, {id}, {state}) {
            return wrapExceptional(() =>
                ProductAccess.product({id}, {user: state.user})
            )
        }
    }
}

import React from "react"
import {
    compose, lifecycle, setDisplayName, withProps
} from "recompose"

import {
    fetchProduct, addCategoryToProduct,
    updateProduct
}  from "../actions/Product"

import Product from "../components/Product"

import withReduxState       from "./WithReduxState"
import withReduxDispatch    from "./WithReduxDispatch"

const enhance = compose(
    withReduxState(["products"]),
    withReduxDispatch({
        fetchProduct: {
            parameterized: fetchProduct
        },
        addCategoryToProduct: {
            parameterized: addCategoryToProduct
        },
        updateProduct: {
            parameterized: updateProduct
        }
    }),
    withProps(props => ({
        onChange(changes) {
            props.updateProduct(props.productID, changes)
        },
        ...props.products[props.productID],
    })),
    lifecycle({
        componentDidMount() {
            this.props.fetchProduct(this.props.productID)
        }
    })
)

export default enhance(Product)

import React from "react"
import {
    compose, lifecycle, setDisplayName, withProps
} from "recompose"

import {fetchProduct, addCategoryToProduct}  from "../actions/Product"

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
        }
    }),
    withProps(props => ({
        onCategoryCreate(category) {
            return props.addCategoryToProduct(props.productID, category._id)
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

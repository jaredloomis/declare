import React from "react"
import {
    compose, lifecycle, setDisplayName, withState
} from "recompose"

import {listProducts}       from "../actions/Product"
import {setFocusProduct}    from "../actions/User"
import {focusProduct}       from "../selectors/Product"

import Modal                from "../components/base/Modal"
import Heading              from "../components/base/Heading"
import ProductListComponent from "../components/ProductList"
import ProductCreate        from "./ProductCreate"

import withReduxState       from "./WithReduxState"
import withReduxDispatch    from "./WithReduxDispatch"

const ProductList = props => {
    const openModal     = () => props.setCreateInProgress(true)
    const closeModal    = () => props.setCreateInProgress(false)
    const activate      = props.setFocusProduct

    return [
        <ProductListComponent {...props}
            onCreate={openModal} onActivate={activate}
            focusProduct={props.focusProduct}
            key="productlist-child-1"/>,
        <Modal active={props.createInProgress} onClose={closeModal} key="productlist-modal">
            <Heading>Create Product</Heading>
            <ProductCreate/>
        </Modal>
    ]
}

const enhance = compose(
    withReduxState(["products", {focusProduct}]),
    withReduxDispatch({
        listProducts,
        setFocusProduct: {
            parameterized: setFocusProduct
        }
    }),
    withState("createInProgress", "setCreateInProgress", false),
    lifecycle({
        componentDidMount() {
            this.props.listProducts()
        }
    }),
    setDisplayName("ProductListContainer")
)

export default enhance(ProductList)

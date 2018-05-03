import React from "react"
import {
    compose, lifecycle, setDisplayName, withState
} from "recompose"

import {listProducts, createProduct}  from "../actions/Product"

import Modal                from "../components/base/Modal"
import ProductListComponent from "../components/ProductList"
import ProductCreate        from "../components/ProductCreate"

import withReduxState       from "./WithReduxState"
import withReduxDispatch    from "./WithReduxDispatch"

const ProductList = props => {
    const createProd    = prod => props.createProduct({
        pageCategories: [],
        elementCategories: [],
        inputTypeCategories: [],
        ...prod
    })

    const openModal     = () => props.setCreateInProgress(true)
    const closeModal    = () => props.setCreateInProgress(false)

    return [
        <ProductListComponent {...props} onCreate={openModal} key="productlist-child-1"/>,
        <Modal active={props.createInProgress} onClose={closeModal} key="productlist-modal">
            <ProductCreate onCreate={createProd}/>
        </Modal>
    ]
}

const enhance = compose(
    withReduxState(["products"]),
    withReduxDispatch({
        listProducts,
        createProduct: {
            parameterized: createProduct
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

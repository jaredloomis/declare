/*
import React            from "react"
import {setDisplayName} from "recompose"

import Box              from "./base/Box"
import Category         from "../containers/Category"

const PageListBase = ({rootCategoryIDs}) => {
    return <div>
        {rootCategoryIDs.map(categoryID =>
            <Category categoryID={categoryID}/>
        )}
    </div>
}

const enhance = setDisplayName("PageList")
export default enhance(PageListBase)

import React from "react"
import {
    compose, lifecycle, setDisplayName, withState
} from "recompose"

import {listProducts, createProduct}  from "../actions/Product"
import {watchReports}  from "../actions/Report"

import Modal                from "../components/base/Modal"
import ProductListComponent from "../components/ProductList"
import ProductCreate        from "../components/ProductCreate"

import withReduxState       from "./WithReduxState"
import withReduxDispatch    from "./WithReduxDispatch"

import Environment    from "./Environment"

const ProductList = props => {
    const createProd    = prod => props.createProduct({
        pageCategories: [],
        elementCategories: [],
        inputTypeCategories: [],
        ...prod
    })

    const openModal     = () => props.setCreateInProgress(true)
    const closeModal    = () => props.setCreateInProgress(false)

    return <div>
        {rootCategoryIDs.map(categoryID =>
            <Category categoryID={categoryID}/>
        )}
        <Modal active={props.createInProgress} onClose={closeModal} key="productlist-modal">
            <ProductCreate onCreate={createProd}/>
        </Modal>
    </div>
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
    */

export default null

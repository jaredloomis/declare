import React from "react"
import {
    compose, lifecycle, setDisplayName
} from "recompose"

import {listProducts, createProduct} from "../actions/Product"
import {listEnvironments}            from "../actions/Environment"
import ProductCreateComponent        from "../components/ProductCreate"
import withReduxDispatch             from "./WithReduxDispatch"
import withReduxState                from "./WithReduxState"

const ProductCreate = props => {
    const createProd = async prod => {
        const prodModel = await props.createProduct({
            pageCategories: [],
            elementCategories: [],
            inputTypeCategories: [],
            ...prod
        })

        if(props.onCreate) {
            props.onCreate(prodModel)
        }
    }

    return <ProductCreateComponent onCreate={createProd}/>
}

const enhance = compose(
    withReduxState(["environments"]),
    withReduxDispatch({
        listProducts,
        createProduct: {
            parameterized: createProduct
        },
        listEnvironments
    }),
    lifecycle({
        componentWillMount() {
            this.props.listProducts()
            this.props.listEnvironments()
        }
    }),
    setDisplayName("ProductCreateContainer")
)

export default enhance(ProductCreate)

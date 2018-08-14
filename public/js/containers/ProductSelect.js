import React from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {listProducts} from "../actions/Product"
import Select             from "../components/base/Select"
import withReduxState     from "./WithReduxState"
import withReduxDispatch  from "./WithReduxDispatch"

const ProductSelectBase = props => {
    const children = !props.products ? null : Object.keys(props.products)
        .map(inputTyID =>
            <span value={inputTyID} key={inputTyID}>
                {props.products[inputTyID].name}
            </span>
        )
    return <Select label={props.label || "Product"} {...props}>
        {children}
    </Select>
}

const enhance = compose(
    withReduxDispatch({
        listProducts
    }),
    lifecycle({
        componentDidMount() {
            this.props.listProducts()
        }
    }),
    withReduxState(["products"]),
    setDisplayName("ProductSelect")
)

export default enhance(ProductSelectBase)

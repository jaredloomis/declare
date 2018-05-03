import React from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {
    listElements, createElement
} from "../actions/Element"
import {listProducts}    from "../actions/Product"
import QuickSelect       from "../components/base/QuickSelect"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const ElementQuickSelectBase = props => {
    const children = !props.elements ? null :
        Object.keys(props.elements)
            .filter(elemID => props.elements[elemID].product === props.productID)
            .map(elemID =>
                <span value={elemID} key={elemID}>
                    {props.elements[elemID].name}
                </span>
            )

    const create = selector => {
        props.createElement({
            selector,
            name: selector
        }).then(el =>
            props.onChange(el._id)
        )
    }

    return <QuickSelect label={props.label || "Element"} onChange={props.onChange} onCreate={create} {...props}>
        {children}
    </QuickSelect>
}

const enhance = compose(
    withReduxDispatch({
        listElements,
        listProducts,
        createElement: {
            parameterized: createElement
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.listElements()
            this.props.listProducts()
        }
    }),
    withReduxState(["elements", "products"]),
    setDisplayName("ElementQuickSelect")
)

export default enhance(ElementQuickSelectBase)

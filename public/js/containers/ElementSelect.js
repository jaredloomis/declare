import React from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {
    listElements, createElement
} from "../actions/Element"
import Select            from "../components/base/Select"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const ElementSelectBase = props => {
    const children = !props.elements ? [] :
        Object.keys(props.elements)
            .filter(elemID => props.elements[elemID].product === props.productID)
            .map(elemID =>
                <span value={elemID} key={elemID}>
                    {props.elements[elemID].name}
                </span>
            )

    return <Select label={props.label || "Element"} onChange={props.onChange} {...props}>
        {children}
    </Select>
}

const enhance = compose(
    withReduxDispatch({
        listElements,
        createElement: {
            parameterized: createElement
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.listElements()
        }
    }),
    withReduxState(["elements", "products"]),
    setDisplayName("ElementSelect")
)

export default enhance(ElementSelectBase)

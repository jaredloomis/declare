import React from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {
    listElements, createElement
} from "../actions/Element"
import QuickSelect       from "../components/base/QuickSelect"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const ElementSelectBase = props => {
    const children = !props.elements ? null :
        Object.keys(props.elements).map(elemID =>
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
        createElement: {
            parameterized: createElement
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.listElements()
        }
    }),
    withReduxState(["elements"]),
    setDisplayName("ElementSelect")
)

export default enhance(ElementSelectBase)

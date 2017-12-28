import React from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {listElements}    from "../actions/Element"
import Select            from "../components/base/Select"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const ElementSelectBase = props => {
    const children = !props.elements ? null :
        Object.keys(props.elements).map(elemID =>
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
        listElements
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

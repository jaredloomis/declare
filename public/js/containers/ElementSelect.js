import React from "react"

import Select         from "../components/base/Select"
import withReduxState from "./WithReduxState"

const ElementSelect = withReduxState(["elements"], props => {
    const children = !props.elements ? null :
        Object.keys(props.elements).map(elemID =>
            <span value={elemID} key={elemID}>
                {props.elements[elemID].name}
            </span>
        )
    return <Select label="Element" onChange={props.onChange} {...props}>
        {children}
    </Select>
})

ElementSelect.displayName = "ElementSelect"
export default ElementSelect

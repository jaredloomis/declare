import React         from "react"

import ElementSelect from "../containers/ElementSelect"

const FieldElement = props => {
    const change = value => {
        props.onChange(props.uid)(value)
    }
    const def    = props.defaultValue
    return <ElementSelect defaultValue={def} onChange={change}/>
}

FieldElement.displayName = "FieldElement"
export default FieldElement

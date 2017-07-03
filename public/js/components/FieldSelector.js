import React     from "react"
import FieldText from "./FieldText"

const FieldSelector = props => {
    const change = uid => event => {
        props.onChange(uid)({css: event.target.value})
    }
    const def    = props.defaultValue && props.defaultValue.css
    return <FieldText {...props} defaultValue={def} onChange={change}/>
}

FieldSelector.displayName = "FieldSelector"
export default FieldSelector

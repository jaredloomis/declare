import React from "react"

import TextInput from "./base/TextInput"

const FieldText = props => {
    const {name, onChange, uid} = props
    const change = event => onChange(uid)(event)
    return <TextInput {...props} label={name} onChange={change}/>
}

FieldText.displayName = "FieldText"
export default FieldText

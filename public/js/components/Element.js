import React from "react"

import InputTypeSelect from "../containers/InputTypeSelect"
import TextInput from "./base/TextInput"
import Button from "./base/Button"

const Element = props => {
    // Default (initial) values
    const defName     = props.defaultValue && props.defaultValue.name
    const defSelector = props.defaultValue && props.defaultValue.selector
    const defType     = props.defaultValue && props.defaultValue.inputType

    // Responding to changes
    const textChange = propName => event => props.onChange({
        [propName]: event.target.value
    })
    const typeChange     = value => props.onChange({
        inputType: value
    })

    return <div>
        <TextInput label="Name"     onChange={textChange("name")}
            defaultValue={defName}/>
        <TextInput label="Selector" onChange={textChange("selector")}
            defaultValue={defSelector}/>
        <InputTypeSelect onChange={typeChange}
            defaultValue={defType}/>
        <Button onClick={props.onSave}>Save</Button>
        <Button onClick={props.onRemove}>Delete</Button>
    </div>
}

Element.displayName = "Element"

export default Element

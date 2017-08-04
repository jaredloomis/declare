import React from "react"

import TextInput from "base/TextInput"

export default props => {
    // Default (initial) values
    const defSelector = props.defaultValue && props.defaultValue.selector
    const defType     = props.defaultValue && props.defaultValue.inputType

    // Responding to changes
    const selectorChange = event => props.onChange({
        selector: event.target.value
    })
    const typeChange     = value => props.onChange({
        inputType: value
    })

    return <div>
        <TextInput label="Selector" onChange={selectorChange}
            defaultValue={defSelector}/>
        <InputTypeSelect onChange={typeChange}
            defaultValue={defType}/>
    </div>
}

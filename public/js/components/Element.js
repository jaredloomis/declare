import React from "react"

import InputTypeSelect from "../containers/InputTypeSelect"
import TextInput       from "./base/TextInput"
import Button          from "./base/Button"
import Group           from "./base/Group"
import Row             from "./base/Row"
import Column          from "./base/Column"

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
        <Row>
            <Column>
                <TextInput label="Name"     onChange={textChange("name")}
                    defaultValue={defName}/>
            </Column>
            <Column>
                <TextInput label="Selector" onChange={textChange("selector")}
                    defaultValue={defSelector}/>
            </Column>
            <Column>
                <InputTypeSelect onChange={typeChange}
                    defaultValue={defType}/>
            </Column>
        </Row>
        <Group>
            <Button onClick={props.onSave} type="primary">Save</Button>
            <Button onClick={props.onRemove} type="danger outlined">Delete</Button>
        </Group>
    </div>
}

Element.displayName = "Element"
export default Element

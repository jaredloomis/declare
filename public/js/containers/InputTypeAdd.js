import React          from "react"
import {
    compose, setDisplayName, withState
} from "recompose"

import Button            from "../components/base/Button"
import TextInput         from "../components/base/TextInput"
import AddonsField       from "../components/base/AddonsField"
import withReduxDispatch from "./WithReduxDispatch"

import {createInputType} from "../actions/InputType"

const InputTypeAddBase = props => {
    const create = () => {
        props.createInputType(props.input.name).then(props.onCreate)
    }

    const inputChange = name => value => {
        props.setInput({
            ...props.input,
            [name]: value
        })
    }

    return <AddonsField>
        <TextInput label="Input Type Name" defaultValue={props.input.name}
                   onChange={inputChange("name")}/>
        <Button onClick={create} inline type="info">
            Create Input Type
        </Button>
    </AddonsField>
}

const enhance = compose(
    withReduxDispatch({
        createInputType: {
            parameterized: createInputType
        }
    }),
    withState("input", "setInput", {}),
    setDisplayName("InputTypeAdd")
)

export default enhance(InputTypeAddBase)

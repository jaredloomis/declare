import React          from "react"
import {
    compose, setDisplayName, withState
} from "recompose"

import Button            from "../components/base/Button"
import TextInput         from "../components/base/TextInput"
import AddonsField       from "../components/base/AddonsField"
import withReduxDispatch from "./WithReduxDispatch"

import {createElement} from "../actions/Element"

const ElementAddBase = props => {
    const create = () => {
        props.createElement({
            product: props.productID,
            ...props.input
        }).then(
            props.onCreate
        )
    }

    const inputChange = name => value => {
        props.setInput({
            ...props.input,
            [name]: value
        })
    }

    return <AddonsField>
        <TextInput label="Name" defaultValue={props.input.name}
                   onChange={inputChange("name")}/>
        <TextInput label="Selector" defaultValue={props.input.selector}
                   onChange={inputChange("selector")}/>
        <Button onClick={create} inline type="info">
            Create Element
        </Button>
    </AddonsField>
}

const enhance = compose(
    withReduxDispatch({
        createElement: {
            parameterized: createElement
        }
    }),
    withState("input", "setInput", {}),
    setDisplayName("ElementAdd")
)

export default enhance(ElementAddBase)

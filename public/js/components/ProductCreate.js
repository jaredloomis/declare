import React from "react"
import {
    compose, withState, setDisplayName
} from "recompose"

import Button      from "./base/Button"
import TextInput   from "./base/TextInput"
import AddonsField from "./base/AddonsField"

const ProductCreate = ({onCreate, input, setInput}) => {
    const nameChange = value => {
        setInput({
            ...input,
            name: value
        })
    }

    const create = () => onCreate(input)

    return <AddonsField>
        <TextInput label="Product Name" onChange={nameChange}/>
        <Button type="info" inline onClick={create}>Create</Button>
    </AddonsField>
}

const enhance = compose(
    withState("input", "setInput", {}),
    setDisplayName("ProductCreate")
)

export default enhance(ProductCreate)

import React from "react"
import {
    compose, withState, setDisplayName
} from "recompose"

import Button            from "./base/Button"
import TextInput         from "./base/TextInput"
import AddonsField       from "./base/AddonsField"
import EnvironmentSelect from "../containers/EnvironmentSelect"

const ProductCreate = ({onCreate, input, setInput}) => {
    const nameChange = name =>
        setInput({
            ...input,
            name
        })

    const envChange = defaultEnvironment =>
        setInput({
            ...input,
            defaultEnvironment
        })

    const create = () => onCreate(input)

    return <AddonsField>
        <TextInput label="Product Name" onChange={nameChange}/>
        <EnvironmentSelect label="Default Environment" onChange={envChange}/>
        <Button type="info" inline onClick={create}>Create</Button>
    </AddonsField>
}

const enhance = compose(
    withState("input", "setInput", {}),
    setDisplayName("ProductCreate")
)

export default enhance(ProductCreate)

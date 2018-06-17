import React from "react"
import {
    compose, withState, setDisplayName
} from "recompose"

import {listEnvironments, createEnvironment}  from "../actions/Environment"

import Button            from "../components/base/Button"
import TextInput         from "../components/base/TextInput"
import AddonsField       from "../components/base/AddonsField"

import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const EnvironmentCreate = props => {
    const {input, setInput} = props

    const nameChange = value => {
        setInput({
            ...input,
            name: value
        })
    }

    const create = () =>
        props.createEnvironment({
            name: input.name
        })

    return <AddonsField>
        <TextInput label="Environment Name" onChange={nameChange}/>
        <Button type="info" inline onClick={create}>Create</Button>
    </AddonsField>
}

const enhance = compose(
    withReduxDispatch({
        createEnvironment: {
            parameterized: createEnvironment
        }
    }),
    withState("input", "setInput", {}),
    setDisplayName("EnvironmentCreate")
)

export default enhance(EnvironmentCreate)

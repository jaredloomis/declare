import React          from "react"
import {
    compose, setDisplayName, withState
} from "recompose"

import Button            from "../components/base/Button"
import TextInput         from "../components/base/TextInput"
import AddonsField       from "../components/base/AddonsField"
import withReduxDispatch from "./WithReduxDispatch"

import {createTestRun} from "../actions/TestRun"

const TestRunAdd = props => {
    const create = () => {
        props.createTestRun(props.input).then(
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
        <Button onClick={create} inline type="info">
            Create Test Run
        </Button>
    </AddonsField>
}

const enhance = compose(
    withReduxDispatch({
        createTestRun: {
            parameterized: createTestRun
        }
    }),
    withState("input", "setInput", {}),
    setDisplayName("TestRunAdd")
)

export default enhance(TestRunAdd)

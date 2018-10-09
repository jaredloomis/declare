import React from "react"
import {
    compose, withState, setDisplayName
} from "recompose"
import PropTypes from "prop-types"

import {createCustomTest} from "../actions/CustomTest"

import Button            from "../components/base/Button"
import TextInput         from "../components/base/TextInput"
import AddonsField       from "../components/base/AddonsField"

import withReduxDispatch from "./WithReduxDispatch"

/**
 * Component that requests from user the minimum reqd info
 * for a CustomTest, then creates it.
 *
 * @prop {String}!      pageID
 * @prop {Test -> any}! onCreate
 */
const CustomTestCreate = props => {
    const {input, setInput} = props

    const nameChange = name => {
        setInput({
            ...input,
            name
        })
    }

    const create = () =>
        props.createCustomTest(props.pageID, {
            name: input.name
        }).then(test => {
            if(props.onCreate)
                props.onCreate(test)
        })

    return <AddonsField>
        <TextInput label="Test Name" onChange={nameChange}/>
        <Button type="info" inline onClick={create}>Create</Button>
    </AddonsField>
}

CustomTestCreate.propTypes = {
    pageID:   PropTypes.string.isRequired,
    onCreate: PropTypes.func.isRequired
}

const enhance = compose(
    withReduxDispatch({
        createCustomTest: {
            parameterized: createCustomTest
        }
    }),
    withState("input", "setInput", {}),
    setDisplayName("CustomTestCreate")
)

export default enhance(CustomTestCreate)

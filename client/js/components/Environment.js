import React            from "react"
import {
    setDisplayName, compose, withState
} from "recompose"

import Button          from "./base/Button"
import TextInput       from "./base/TextInput"
import Row             from "./base/Row"
import Column          from "./base/Column"
import EditableText    from "./base/EditableText"
import EditableHeading from "./base/EditableHeading"

/**
 * Props:
 * name             : String
 * variables        : [Variable]
 * onVariableChange : (variableIndex: Number,
 *                     {identifier : String} | {value : String})
 *                     => any
 * onVariableAdd    : () => any
 * onSave           : () => any
 * onInfoChange     : Object -> any
 */
const Environment = props => {
    const {
        name, description, variables,
        onVariableChange, onVariableAdd, onVariableRemove, onSave,
        onInfoChange,
        setState, state
    } = props

    const recomputeIDs = varLen => {
        varLen = varLen || variables.length
        const missingIDCount = varLen - state.variableIDs.length
        if(missingIDCount > 0) {
            setState({
                ...state,
                variableIDs: state.variableIDs.concat(
                    Array.from(Array(missingIDCount)).map(Math.random)
                )
            })
        }
        if(missingIDCount < 0) {
            const len = state.variableIDs.length
            setState({
                ...state,
                variableIDs: state.variableIDs.filter((v, vi) =>
                    vi > len + missingIDCount
                )
            })
        }
    }

    const addVariable = () => {
        onVariableAdd()
        recomputeIDs(variables.length + 1)
    }

    const infoChange = key => value =>
        onInfoChange({
            [key]: value
        })

    const variablesView = variables && variables.map((variable, variableI) => {
        const identifierChange = identifier =>
            onVariableChange(variableI, {identifier})
        const valueChange      = value =>
            onVariableChange(variableI, {value})
        const remove           = () => {
            onVariableRemove(variableI)
            recomputeIDs(variables.length - 1)
        }

        return <Row key={state.variableIDs[variableI] || variable._id || variable.id || variableI}>
            <Column>
                <TextInput
                    label="Identifier"
                    onChange={identifierChange}
                    defaultValue={variable.identifier}/>
            </Column>
            <Column>
                <TextInput
                    label="Value"
                    onChange={valueChange}
                    defaultValue={variable.value}/>
            </Column>
            <Column size="2">
                <Button type="danger" inline onClick={remove}>X</Button>
            </Column>
        </Row>
    })

    return <div>
        <EditableHeading onChange={infoChange("name")}>
            {name}
        </EditableHeading>
        <EditableText onChange={infoChange("description")}>
            {description}
        </EditableText>
        {variablesView}
        <Button type="info"    onClick={addVariable}>+</Button>
        <br/>
        <Button type="primary" onClick={onSave}>Save</Button>
    </div>
}

const enhance = compose(
    withState("state", "setState", props => ({
        variableIDs: !props.variables ? [] : props.variables.map(v => Math.random())
    })),
    setDisplayName("Environment")
)

export default enhance(Environment)

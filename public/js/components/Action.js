import React from "react"
import {withState, compose, setDisplayName} from "recompose"

import {actionTypes} from "../../../app/config/Action"
import Row           from "./base/Row"
import Column        from "./base/Column"
import Button        from "./base/Button"
import Select        from "./base/Select"
import TextInput     from "./base/TextInput"
import ElementSelect from "../containers/ElementSelect"
import PageSelect    from "../containers/PageSelect"
import {deepSet}     from "../lib/Deep"

import bulma from "../../style/bulma"

const Action = ({actionType, values, setActionType, setValues, onChange, onRemove}) => {
    const tyChange  = ty => {
        setActionType(ty)
        onChange({
            actionType: ty,
            values
        })
    }
    const valChange = path => value => {
        const vals = deepSet(path, value, values)
        setValues(vals)
        onChange({
            actionType,
            values: vals
        })
    }
    const actionSpecificValues = (() => {
        const props = {
            values,
            onValueChange: valChange
        }

        if(actionType === actionTypes.CLICK) {
            return <ClickAction {...props}/>
        } else if(actionType === actionTypes.ASSERT_ELEMENT_CONTAINS) {
            return <AssertElementContainsAction {...props}/>
        } else if(actionType === actionTypes.EXTRACT_FROM_ELEMENT) {
            return <ExtractElementTextAction {...props}/>
        } else if(actionType === actionTypes.ASSERT_JS_TRUE) {
            return <AssertJsAction {...props}/>
        } else if(actionType === actionTypes.EXTRACT_FROM_JS) {
            return <ExtractJsAction {...props}/>
        } else if(actionType === actionTypes.NAVIGATE_TO_PAGE) {
            return <NavigateAction {...props}/>
        } else if(actionType === actionTypes.SEND_INPUT) {
            return <SendInputAction {...props}/>
        } else {
            return <span>Kinda-sorta error - no known action type selected.</span>
        }
    })()

    return <Row>
        <Column size="3">
        <Select label="Action" onChange={tyChange} defaultValue={actionType}>
            <span value={actionTypes.CLICK}>Click</span>
            <span value={actionTypes.ASSERT_ELEMENT_CONTAINS}>Assert Element Contains</span>
            <span value={actionTypes.EXTRACT_FROM_ELEMENT}>Extract From Element</span>
            <span value={actionTypes.ASSERT_JS_TRUE}>Assert JavaScript Returns true</span>
            <span value={actionTypes.EXTRACT_FROM_JS}>Extract From JavaScript</span>
            <span value={actionTypes.NAVIGATE_TO_PAGE}>Navigate to Page</span>
            <span value={actionTypes.SEND_INPUT}>Send Input</span>
        </Select>
        </Column>
        {actionSpecificValues}
        <Column size="2">
        <Button inline={true} type="danger outlined" onClick={onRemove}>
            <i className="material-icons">delete</i>
        </Button>
        </Column>
    </Row>
}

const ClickAction = ({values, onValueChange}) =>
    <Column size="7">
        <ElementSelect defaultValue={values.element}
                       onChange={onValueChange(["element"])}/>
    </Column>

const AssertElementContainsAction = ({values, onValueChange}) => [
    <Column size="4">
        <ElementSelect defaultValue={values.element}
                       onChange={onValueChange(["element"])}/>
    </Column>,
    <Column size="3">
        <TextInput defaultValue={values.text}
                   onChange={ev => onValueChange(["text"])(ev.target.value)}
                   label="Text"/>
    </Column>
]

const ExtractElementTextAction = ({values, onValueChange}) => [
    <Column size="4">
        <ElementSelect defaultValue={values.element}
                       onChange={onValueChange(["element"])}/>
    </Column>,
    <Column size="3">
        <TextInput defaultValue={values.variableName}
                   onChange={ev => onValueChange(["variableName"])(ev.target.value)}
                   label="Variable Name"/>
    </Column>
]

const AssertJsAction = ({values, onValueChange}) =>
    <Column size="7">
        <TextInput defaultValue={values.code}
                   onChange={ev => onValueChange(["code"])(ev.target.value)}
                   label="Javascript Code"/>
    </Column>

const ExtractJsAction = ({values, onValueChange}) => [
    <Column size="4">
        <TextInput defaultValue={values.code}
                   onChange={ev => onValueChange(["code"])(ev.target.value)}
                   label="JavaScript Code"/>
    </Column>,
    <Column size="3">
        <TextInput defaultValue={values.variableName}
                   onChange={ev => onValueChange(["variableName"])(ev.target.value)}
                   label="Variable Name"/>
    </Column>
]

const NavigateAction = ({values, onValueChange}) =>
    <Column size="7">
        <PageSelect defaultValue={values.page}
                    onChange={onValueChange(["page"])}
                    label="Destination"/>
    </Column>

const SendInputAction = ({values, onValueChange}) => [
    <Column size="4">
        <ElementSelect defaultValue={values.element}
                       onChange={onValueChange(["element"])}/>
    </Column>,
    <Column size="3">
        <TextInput defaultValue={values.input}
                   onChange={ev => onValueChange(["input"])(ev.target.value)}
                   label="Input Text"/>
    </Column>
]


const enhance = compose(
    setDisplayName("Action"),
    withState("actionType", "setActionType", ({actionType}) => actionType),
    withState("values",     "setValues",     ({values})     => values)
)

export default enhance(Action)

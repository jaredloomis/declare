import React from "react"
import {withState, compose, setDisplayName} from "recompose"

import {actionTypes} from "../../../app/config/Action"
import Row           from "./base/Row"
import Column        from "./base/Column"
import Button        from "./base/Button"
import Select        from "./base/Select"
import TextInput     from "./base/TextInput"
import ElementQuickSelect from "../containers/ElementQuickSelect"
import PageSelect    from "../containers/PageSelect"
import {deepSet}     from "../lib/Deep"

const Action = ({actionType, values={}, setActionType, setValues, onChange, onRemove}) => {
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
        } else if(actionType === actionTypes.SLEEP) {
            return <SleepAction {...props}/>
        } else if(actionType === actionTypes.GO_TO_URL) {
            return <GoToUrlAction {...props}/>
        } else {
            return <span/>
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
            <span value={actionTypes.SLEEP}>Sleep</span>
            <span value={actionTypes.GO_TO_URL}>Go to URL</span>
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
        <ElementQuickSelect defaultValue={values && values.element}
                       onChange={onValueChange(["element"])}/>
    </Column>

const AssertElementContainsAction = ({values, onValueChange}) => [
    <Column size="4" key="0">
        <ElementQuickSelect defaultValue={values.element}
                       onChange={onValueChange(["element"])}/>
    </Column>,
    <Column size="3" key="1">
        <TextInput defaultValue={values.text}
                   onChange={onValueChange(["text"])}
                   label="Text"/>
    </Column>
]

const ExtractElementTextAction = ({values, onValueChange}) => [
    <Column size="4" key="0">
        <ElementQuickSelect defaultValue={values.element}
                       onChange={onValueChange(["element"])}/>
    </Column>,
    <Column size="3" key="1">
        <TextInput defaultValue={values.variableName}
                   onChange={onValueChange(["variableName"])}
                   label="Variable Name"/>
    </Column>
]

const AssertJsAction = ({values, onValueChange}) =>
    <Column size="7">
        <TextInput defaultValue={values.code}
                   onChange={onValueChange(["code"])}
                   label="Javascript Code"/>
    </Column>

const ExtractJsAction = ({values, onValueChange}) => [
    <Column size="4" key="0">
        <TextInput defaultValue={values.code}
                   onChange={onValueChange(["code"])}
                   label="JavaScript Code"/>
    </Column>,
    <Column size="3" key="1">
        <TextInput defaultValue={values.variableName}
                   onChange={onValueChange(["variableName"])}
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
    <Column size="3" key="0">
        <ElementQuickSelect defaultValue={values.element}
                       onChange={onValueChange(["element"])}/>
    </Column>,
    <Column size="4" key="1">
        <TextInput defaultValue={values.input}
                   onChange={onValueChange(["input"])}
                   label="Input Text"/>
    </Column>
]

const SleepAction = ({values, onValueChange}) =>
    <Column size="7">
        <TextInput defaultValue={values.duration}
                   onChange={onValueChange(["duration"])}
                   label="Duration (ms)"/>
    </Column>

const GoToUrlAction = ({values, onValueChange}) =>
    <Column size="7">
        <TextInput defaultValue={values.url}
                   onChange={onValueChange(["url"])}
                   label="URL"/>
    </Column>


const enhance = compose(
    setDisplayName("Action"),
    withState("actionType", "setActionType", ({actionType}) => actionType),
    withState("values",     "setValues",     ({values})     => values)
)

export default enhance(Action)

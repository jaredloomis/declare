import React from "react"
import {withState, compose, setDisplayName} from "recompose"

import {actionTypes} from "../../../app/config/Action"
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

    return <div className={bulma.columns}>
        <div className={`${bulma.column} ${bulma.is_one_quarter}`}>
        <Select label="Action" onChange={tyChange} defaultValue={actionType}>
            <span value={actionTypes.CLICK}>Click</span>
            <span value={actionTypes.ASSERT_ELEMENT_CONTAINS}>Assert Element Contains</span>
            <span value={actionTypes.EXTRACT_FROM_ELEMENT}>Extract From Element</span>
            <span value={actionTypes.ASSERT_JS_TRUE}>Assert JavaScript Returns true</span>
            <span value={actionTypes.EXTRACT_FROM_JS}>Extract From JavaScript</span>
            <span value={actionTypes.NAVIGATE_TO_PAGE}>Navigate to Page</span>
            <span value={actionTypes.SEND_INPUT}>Send Input</span>
        </Select>
        </div>
        {actionSpecificValues}
        <div className={bulma.column}>
        <Button inline={true} type="danger outlined" onClick={onRemove}>
            <i className="material-icons">delete</i>
        </Button>
        </div>
    </div>
}

const ClickAction = ({values, onValueChange}) =>
    <div className={bulma.column}>
        <ElementSelect defaultValue={values.element}
                       onChange={onValueChange(["element"])}/>
    </div>

const AssertElementContainsAction = ({values, onValueChange}) => [
    <div className={bulma.column}>
        <ElementSelect defaultValue={values.element}
                       onChange={onValueChange(["element"])}/>
    </div>,
    <div className={bulma.column}>
        <TextInput defaultValue={values.text}
                   onChange={ev => onValueChange(["text"])(ev.target.value)}
                   label="Text"/>
    </div>
]

const ExtractElementTextAction = ({values, onValueChange}) => [
    <div className={bulma.column}>
        <ElementSelect defaultValue={values.element}
                       onChange={onValueChange(["element"])}/>
    </div>,
    <div className={bulma.column}>
        <TextInput defaultValue={values.variableName}
                   onChange={ev => onValueChange(["variableName"])(ev.target.value)}
                   label="Variable Name"/>
    </div>
]

const AssertJsAction = ({values, onValueChange}) =>
    <div className={bulma.column}>
        <TextInput defaultValue={values.code}
                   onChange={ev => onValueChange(["code"])(ev.target.value)}
                   label="Javascript Code"/>
    </div>

const ExtractJsAction = ({values, onValueChange}) => [
    <div className={bulma.column}>
        <TextInput defaultValue={values.code}
                   onChange={ev => onValueChange(["code"])(ev.target.value)}
                   label="JavaScript Code"/>
    </div>,
    <div className={bulma.column}>
        <TextInput defaultValue={values.variableName}
                   onChange={ev => onValueChange(["variableName"])(ev.target.value)}
                   label="Variable Name"/>
    </div>
]

const NavigateAction = ({values, onValueChange}) =>
    <div className={bulma.column}>
        <PageSelect defaultValue={values.page}
                    onChange={onValueChange(["page"])}
                    label="Destination"/>
    </div>

const SendInputAction = ({values, onValueChange}) => [
    <div className={bulma.column}>
        <ElementSelect defaultValue={values.element}
                       onChange={onValueChange(["element"])}/>
    </div>,
    <div className={bulma.column}>
        <TextInput defaultValue={values.input}
                   onChange={ev => onValueChange(["input"])(ev.target.value)}
                   label="Input Text"/>
    </div>
]


const enhance = compose(
    setDisplayName("Action"),
    withState("actionType", "setActionType", ({actionType}) => actionType),
    withState("values",     "setValues",     ({values})     => values)
)

export default enhance(Action)

import React from "react"
import {withState, compose, setDisplayName} from "recompose"

import {actionTypes} from "../../../app/config/Action"
import Row           from "./base/Row"
import Column        from "./base/Column"
import Button        from "./base/Button"
import Select        from "./base/Select"
import TextInput     from "./base/TextInput"
import Code          from "./base/Code"
import ElementQuickSelect from "../containers/ElementQuickSelect"
import PageSelect    from "../containers/PageSelect"
import {deepSet}     from "../lib/Deep"

const Action = ({onChange, onRemove, productID, actionType, values={}, setActionType, setValues}) => {
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
            productID,
            values: values || {},
            onValueChange: valChange
        }

        if(actionType === actionTypes.CLICK) {
            return <ClickActionDesc {...props}/>
        }/* else if(actionType === actionTypes.ASSERT_ELEMENT_CONTAINS) {
            return <AssertElementContainsActionDesc {...props}/>
        } else if(actionType === actionTypes.EXTRACT_FROM_ELEMENT) {
            return <ExtractElementTextActionDesc {...props}/>
        } else if(actionType === actionTypes.ASSERT_JS_TRUE) {
            return <AssertJsActionDesc {...props}/>
        } else if(actionType === actionTypes.EXTRACT_FROM_JS) {
            return <ExtractJsActionDesc {...props}/>
        } else if(actionType === actionTypes.NAVIGATE_TO_PAGE) {
            return <NavigateActionDesc {...props}/>
        } else if(actionType === actionTypes.SEND_INPUT) {
            return <SendInputActionDesc {...props}/>
        } else if(actionType === actionTypes.SLEEP) {
            return <SleepActionDesc {...props}/>
        } else if(actionType === actionTypes.GO_TO_URL) {
            return <GoToUrlActionDesc {...props}/>
        }*/ else {
            return <span/>
        }
    })()

    return <Row>
        <Column>
            {actionSpecificValues}
        </Column>
    </Row>
}

const ClickActionDesc = ({productID, values, onValueChange}) =>
    <span>
        Click <Code>values.element</Code>
    </span>

const AssertElementContainsAction = ({productID, values, onValueChange}) => [
    <Column size="5" key="0">
        <ElementQuickSelect
            productID={productID}
            defaultValue={values.element}
            onChange={onValueChange(["element"])}/>
    </Column>,
    <Column size="7" key="1">
        <TextInput defaultValue={values.text}
                   onChange={onValueChange(["text"])}
                   label="Text"/>
    </Column>
]

const ExtractElementTextAction = ({productID, values, onValueChange}) => [
    <Column size="5" key="0">
        <ElementQuickSelect
            productID={productID}
            defaultValue={values.element}
            onChange={onValueChange(["element"])}/>
    </Column>,
    <Column size="7" key="1">
        <TextInput defaultValue={values.variableName}
                   onChange={onValueChange(["variableName"])}
                   label="Variable Name"/>
    </Column>
]

const AssertJsAction = ({values, onValueChange}) =>
    <Column>
        <TextInput defaultValue={values.code}
                   onChange={onValueChange(["code"])}
                   label="Javascript Code"/>
    </Column>

const ExtractJsAction = ({values, onValueChange}) => [
    <Column size="7" key="0">
        <TextInput defaultValue={values.code}
                   onChange={onValueChange(["code"])}
                   label="JavaScript Code"/>
    </Column>,
    <Column size="5" key="1">
        <TextInput defaultValue={values.variableName}
                   onChange={onValueChange(["variableName"])}
                   label="Variable Name"/>
    </Column>
]

const NavigateAction = ({values, onValueChange}) =>
    <Column>
        <PageSelect defaultValue={values.page}
                    onChange={onValueChange(["page"])}
                    label="Destination"/>
    </Column>

const SendInputAction = ({productID, values, onValueChange}) => [
    <Column size="5" key="0">
        <ElementQuickSelect
            productID={productID}
            defaultValue={values.element}
            onChange={onValueChange(["element"])}/>
    </Column>,
    <Column size="7" key="1">
        <TextInput defaultValue={values.input}
                   onChange={onValueChange(["input"])}
                   label="Input Text"/>
    </Column>
]

const SleepAction = ({values, onValueChange}) =>
    <Column>
        <TextInput defaultValue={values.duration}
                   onChange={onValueChange(["duration"])}
                   label="Duration (ms)"/>
    </Column>

const GoToUrlAction = ({values, onValueChange}) =>
    <Column>
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

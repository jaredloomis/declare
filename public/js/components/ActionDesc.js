import React from "react"
import {compose, setDisplayName} from "recompose"

import {actionTypes} from "../../../app/config/Action"
import Row           from "./base/Row"
import Column        from "./base/Column"
import TextInput     from "./base/TextInput"
import CodeInline    from "./base/CodeInline"
import CodeBlock     from "./base/CodeBlock"
import ElementQuickSelect from "../containers/ElementQuickSelect"
import PageSelect    from "../containers/PageSelect"
import withReduxState from "../containers/WithReduxState"

const ActionDesc = ({productID, actionType, values={}, elements, pages}) => {
    const props = {
        productID,
        values: values || {},
        elements: elements || {},
        pages: pages || {}
    }

    if(actionType === actionTypes.CLICK) {
        return <ClickDesc {...props}/>
    } else if(actionType === actionTypes.ASSERT_ELEMENT_CONTAINS) {
        return <AssertElementContainsDesc {...props}/>
    } else if(actionType === actionTypes.EXTRACT_FROM_ELEMENT) {
        return <ExtractElementTextDesc {...props}/>
    } else if(actionType === actionTypes.ASSERT_JS_TRUE) {
        return <AssertJsDesc {...props}/>
    } else if(actionType === actionTypes.EXTRACT_FROM_JS) {
        return <ExtractJsDesc {...props}/>
    } else if(actionType === actionTypes.NAVIGATE_TO_PAGE) {
        return <NavigateDesc {...props}/>
    } else if(actionType === actionTypes.SEND_INPUT) {
        return <SendInputDesc {...props}/>
    } else if(actionType === actionTypes.SLEEP) {
        return <SleepDesc {...props}/>
    } else if(actionType === actionTypes.GO_TO_URL) {
        return <GoToUrlDesc {...props}/>
    } else {
        return <span/>
    }
}

const ClickDesc = ({values, elements}) => {
    const elem = elements[values.element]
    return <span>
        Click <CodeInline>{elem && elem.name}</CodeInline>
    </span>
}

const AssertElementContainsDesc = ({values, elements}) => {
    const elem = elements[values.element]
    return <span>
        Assert <CodeInline>{elem && elem.name}</CodeInline>
        contains <CodeInline>{values.text}</CodeInline>
    </span>
}

const ExtractElementTextDesc = ({values, elements}) => {
    const elem = elements[values.element]
    return <span>
        Extract text from <CodeInline>{elem && elem.name}</CodeInline>
        into <CodeInline>{"{{" + values.variableName + "}}"}</CodeInline>
    </span>
}

const AssertJsDesc = ({values}) =>
    <span>
        Assert JavaScript returns <CodeInline>true</CodeInline>
        <CodeBlock language="javascript">{values.code}</CodeBlock>
    </span>

const ExtractJsDesc = ({values}) =>
    <span>
        Extract return value of JavaScript into
        <CodeInline>{"{{" + values.variableName + "}}"}</CodeInline>
        <CodeBlock language="javascript">{values.code}</CodeBlock>
    </span>

const NavigateDesc = ({values, pages}) =>
    <span>
        Navigate to <CodeInline>{pages[values.page] && pages[values.page].name}</CodeInline>
    </span>

const SendInputDesc = ({values, elements}) => {
    const elem = elements[values.element]
    return <span>
        Send <CodeInline>{values.input}</CodeInline>
        into <CodeInline>{elem && elem.name}</CodeInline>
    </span>
}

const SleepDesc = ({values}) =>
    <span>
        Sleep for <CodeInline>{values.duration}</CodeInline> ms
    </span>

const GoToUrlDesc = ({values}) =>
    <span>
        Go to <CodeInline>{values.url}</CodeInline>
    </span>

const enhance = compose(
    setDisplayName("ActionDesc"),
    withReduxState(["elements", "pages"])
)

export default enhance(ActionDesc)

// @flow
import Element        from "../../model/Element"
import {actionTypes}  from "../../config/Action"
import Runner         from "./Runner"
import {Status}       from "./Report"

export const runActions = async (runner: Runner, actions: any) => {
    for(const action of actions) {
        // Execute action
        await runAction(runner, action)

        // If failed, we are done
        if(runner.failed()) break

        // Delay between each action
        await runner.sleep(runner.options.delay)
    }
}

export const runAction = async (runner: Runner, action: any) => {
    const type     = action.actionType
    const elemID   = action.values.element
    const selector = elemID && (await Element.findById(elemID)).selector

    // Click is default, if element is present
    if(type === actionTypes.CLICK || (!type && action.values.element)) {
        await runner.click(selector)
    } else if(type === actionTypes.ASSERT_ELEMENT_CONTAINS) {
        const expectedText = action.values.text
        const allText      = await runner.getTextAll(selector)
        const foundText    = allText.filter(txt => txt.indexOf(expectedText) !== -1)
        runner.assert(foundText.length,
            `Found expected text "${expectedText}" in "${selector}"`,
            `Didn't find expected text "${expectedText}" in "${selector}"`
        )
    } else if(type === actionTypes.EXTRACT_FROM_ELEMENT) {
        const {variableName} = action.values
        const text           = await runner.getText(selector)
        runner.setVariable(variableName, text)
    } else if(type === actionTypes.ASSERT_JS_TRUE) {
        const {code} = action.values
        const ret    = await runner.executeScript(code)
        if(ret) {
            runner.log(
                Status.PASS,
                "JavaScript returned true",
                {code, rawCode: action.values.code, returnValue: ret}
            )
        } else {
            runner.log(
                Status.FAIL,
                "JavaScript returned false (expected true)",
                {code, rawCode: action.values.code, returnValue: ret}
            )
        }
    } else if(type === actionTypes.EXTRACT_FROM_JS) {
        const {variableName, code} = action.values
        const ret            = await runner.executeScript(code)
        runner.setVariable(variableName, ret)
    } else if(type === actionTypes.NAVIGATE_TO_PAGE) {
        const {page} = action.values
        await runner.navigateTo(page)
    } else if(type === actionTypes.SEND_INPUT) {
        const {input} = action.values
        await runner.setValue(selector, input)
    } else if(type === actionTypes.SLEEP) {
        const {duration} = action.values
        await runner.sleep(duration)
    } else if(type === actionTypes.GO_TO_URL) {
        const {url} = action.values
        await runner.get(url)
    } else {
        throw new Error(`Invalid action ${JSON.stringify(action, null, 2)}`)
    }
}

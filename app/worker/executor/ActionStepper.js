// @flow
import Element        from "../../model/Element"
import {actionTypes}  from "../../config/Action"
import Runner         from "./Runner"
import {Status}       from "./Report"

export const runAction = async (runner: Runner, action: any) => {
    const type     = action.actionType
    const elemID   = action.values.element
    const selector = elemID && (await Element.findById(elemID)).selector

    // Click is default, if element is present
    if(type === actionTypes.CLICK || (!type && action.values.element)) {
        await runner.click(selector)
    } else if(type === actionTypes.ASSERT_ELEMENT_CONTAINS) {
        /*
        const expected = action.values.text
        const actual   = await runner.getText(selector)
        runner.assert(expected === actual,
            `Found expected text "${expected}" in "${selector}"`,
            `Didn't find expected text "${expected}" in "${selector}"; found "${actual}"`
        )*/

        /*
        const expectedText = action.values.text
        const selectorFull = `${selector}:contains(${expectedText})`
        runner.assert(await runner.exists(selectorFull),
            `Found expected text "${expectedText}" in "${selector}"`,
            `Didn't find expected text "${expectedText}" in "${selector}"`
        )
        */

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
    } else {
        throw new Error(`Invalid action ${JSON.stringify(action, null, 2)}`)
    }
}
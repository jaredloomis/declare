// @flow
import Promise      from "bluebird"
import Runner       from "../../Runner"
import {
    Page, InputType, Element
} from "declare-db"
import {validInput} from "../../RandomInput"

export default async (runner: Runner, page: Page, values: any, data: any) => {
    const {forms, errorElement, identifierElement} = values

    // Go to start URL
    await runner.get(page.startURL)

    // Loop through forms
    await Promise.all(forms.map(async form => {
        const {destination, inputs} = form
        const submit = (await Element.findById(form.submit)).selector
        // START LOG REGION
        runner.beginLogRegion("Submit form")
        // Fill all inputs in form
        inputs && await Promise.all(inputs.map(fillInput(runner)))
        // Click submit
        await runner.click(submit)
        // Ensure error element doesn't appear
        const err = await runner.exists(errorElement)
        runner.assert(!err, "Check if error is present")
        // END LOG REGION
        runner.endLogRegion()
        // Navigate back to this page if no error
        if(!err) {
            runner.setPage(destination)
            await runner.navigateTo(page._id.toString())
        }
    }))

    return {
        report: runner.report
    }
}

const fillInput = runner => async (elementID) => {
    const element   = await Element.findById(elementID)
    const inputType = await InputType.findById(element.inputType)
    const value = validInput(inputType.constraints)
    await runner.setValue(element.selector, value)
}

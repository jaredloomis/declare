import CustomTest     from "../../model/CustomTest"
import Page           from "../../model/Page"
import Runner         from "./Runner"
import SeleniumDriver from "./SeleniumDriver"
import {runAction}    from "./ActionStepper"

export const executeCustomTest = async customTest => {
    if(typeof customTest === "string" || !customTest._id) {
        customTest = await CustomTest.findById(customTest)
    }

    // Create Runner
    const driver = new SeleniumDriver({})
    const runner = new Runner(driver, customTest.name, {})
    await runner.initNavigator()

    // Go to a root page
    await runner.navigateToRoot(customTest.owner.toString())

    // Navigate to CustomTest's Page
    await runner.navigateTo(customTest.owner.toString())

    // Execute steps
    for(const action of customTest.actions) {
        await runAction(runner, action)
    }

    // Close browser, return report
    await runner.quit()
    return runner.report
}

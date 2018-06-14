import CustomTest     from "../../model/CustomTest"
import Environment    from "../../model/Environment"
import Runner         from "./Runner"
import SeleniumDriver from "./SeleniumDriver"
import {runActions}   from "./ActionStepper"

export const executeCustomTest = async (customTest, options) => {
    if(typeof customTest === "string" || !customTest._id) {
        customTest = await CustomTest.findById(customTest)
    }
    if(options && options.environment &&
      (typeof options.environment === "string" || !options.environment._id)) {
        options.environment = await Environment.findById(options.environment)
    }

    // Create Runner
    const driver = new SeleniumDriver({})
    const runner = new Runner(driver, customTest.name, {})
    await runner.initNavigator()

    // Import Environment variables
    if(options.environment) {
        runner.importEnvironment(options.environment)
    }

    // Go to a root page
    await runner.navigateToRoot(customTest.owner.toString())

    // Navigate to CustomTest's Page
    await runner.navigateTo(customTest.owner.toString())

    // Execute steps
    await runActions(runner, customTest.actions)

    // Close browser
    await runner.quit()

    // Return report
    return runner.report
}

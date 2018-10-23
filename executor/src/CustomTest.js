import {
    Page, CustomTest, Environment, Report //, pubSub
} from "declare-db"
import Runner         from "./Runner"
import SeleniumDriver from "./SeleniumDriver"
import {runActions}   from "./ActionStepper"

export const executeCustomTest = async (customTest, options={}) => {
    if(typeof customTest === "string" || !customTest._id) {
        customTest = await CustomTest.findById(customTest)
    }
    if(options && options.environment &&
      (typeof options.environment === "string" || !options.environment._id)) {
        options.environment = await Environment.findById(options.environment)
    }

    const page = await Page.findById(customTest.owner)

    // Create Runner
    const driver = new SeleniumDriver({})
    const runner = new Runner(driver, customTest.name, {})
    await runner.initNavigator()

    // Set report start time
    runner.report.startTime = new Date()

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

    // Add metadata to report
    runner.report.testID = customTest._id
    runner.report.pageID = page._id
    runner.report.owner  = page.owner
    runner.report.name   =
        options.executionName || customTest.name
    // Add to database after generating video
    const reportModel = new Report(runner.report)
    await reportModel.generateVideo()
    await reportModel.save()

    // Add report to CustomTest, save
    customTest.reports = customTest.reports.concat([reportModel._id])
    await customTest.save()

    // Publish report creation event to PubSub system
    /*pubSub.pubSub.then(({pub}) =>
        pub.publish("report.created", JSON.stringify(reportModel), "utf8")
    )*/

    // Return report
    return reportModel
}

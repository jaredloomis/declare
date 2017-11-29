// @flow
import {internalIDs}  from "../../config/TestPack"
import Page           from "../../model/Page"
import TestPack       from "../../model/TestPack"
import Runner         from "./Runner"
import SeleniumDriver from "./SeleniumDriver"
import {executeCustomTest as executeTest} from "./CustomTest"
import screenshot     from "./modules/screenshot"
import destructive    from "./modules/destructive-input"

export type Module = (runner: Runner, page: Page, values: any, data: any) => any

export const executeCustomTest = executeTest

export const executePack = async (pageID: string, packID: string) => {
    // Collect data for module
    const {internalID} = await TestPack.findOne({_id: packID})
    const page   = await Page.findOne({_id: pageID})
    const tpData = page.testPackData
    const datum  = tpData && tpData.filter(dat =>
        dat.testPack.toString() === packID
    )[0] || {}
    // Create Runner
    const driver = new SeleniumDriver({})
    const runner = new Runner(driver, "Screenshot", {})
    await runner.initNavigator()
    // Find module
    const module = findModule(internalID)
    // Run module
    if(module) {
        const result = await module(runner, page, datum.values, datum.data)
        await runner.quit()
        return processResult(result, pageID, packID)
    } else {
        return {}
    }
}

function findModule(packID: string): ?Module {
    return packID === internalIDs.screenshot  ? screenshot  :
           packID === internalIDs.destructive ? destructive :
                                                null
}

const processResult = (result, pageID, packID) => ({
    ...result,
    report: {
        ...result.report,
        pageID, packID
    }
})

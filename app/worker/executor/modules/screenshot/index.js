// @flow
import Promise  from "bluebird"
import resemble from "node-resemble-js"

import {Status}  from "../../Report"
import Runner    from "../../Runner"
import type Page from "../../../../model/Page"
import {retrieveAsset} from "../../../../access/Asset"

export default async (runner: Runner, page: Page, values: any, data: any) => {
    const url = page.startURL
    await runner.get(url)
    const {key, raw} = await runner.screenshot()
    const newKey = key
    const newBuffer = raw

    try {
    const hasBaseline = data && data.baselineScreenshot
    const refKey      = hasBaseline || newKey

    const refData = await retrieveAsset(refKey)

    const refBuffer = new Buffer(refData, "binary")
 
    const result = await Promise.fromCallback((cb) =>
        resemble(newBuffer)
            .compareTo(refBuffer)
            .onComplete(res => cb(null, res))
    )
    const status = result.misMatchPercentage < parseInt(values.sensitivity) ?
        Status.PASS : Status.FAIL

    runner.log(status, "Check screenshot against baseline")

    const retData = !hasBaseline ? {baselineScreenshot: newKey} : {}
    return {
        report: {
            ...runner.report,
            summary: {
                screenshotNew: newKey,
                screenshotBaseline: refKey,
                percentDifference: result.misMatchPercentage
            }
        },
        data: retData
    }
    } catch(ex) {
        console.log(ex)
    }
}

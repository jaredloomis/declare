import Report              from "../../model/Report"
import ReportBatch         from "../../model/ReportBatch"
import {TEST_TYPE}         from "../../../common/TestRun"
import {executeCustomTest} from "./CustomTest"

export default async (testRun, options) => {
    const reports = []
    for(const test of testRun.tests) {
        if(test.testType === TEST_TYPE.CUSTOM_TEST) {
            const report = await executeCustomTest(test.customTestID)
            const reportModel = new Report(report)
            await reportModel.save()
            reports.push(reportModel._id)
        }
    }

    const batch = new ReportBatch({
        testRun: testRun._id,
        reports,
        owner: testRun.owner
    })
    await batch.save()
    return batch
}

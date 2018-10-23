import {
    ReportBatch, TestRun as TestRunModel
} from "declare-db"
import {TestRun}           from "declare-common"
import {executeCustomTest} from "./CustomTest"
const {TEST_TYPE} = TestRun

export default async (testRun={}, options={}) => {
    const reports = []
    for(const test of (testRun.tests || [])) {
        if(test.testType === TEST_TYPE.CUSTOM_TEST) {
            const report = await executeCustomTest(test.customTestID, {
                environment: testRun.environment
            })
            reports.push(report._id)
        }
    }

    // Create ReportBatch
    const batch = new ReportBatch({
        testRun: testRun._id,
        reports,
        owner: testRun.owner
    })
    await batch.save()

    // Attach ReportBatch to TestRun
    const testRunModel = await TestRunModel.findById(testRun._id)
    testRunModel.reportBatches = testRunModel.reportBatches.concat([
        batch._id
    ])
    await testRunModel.save()

    return batch
}

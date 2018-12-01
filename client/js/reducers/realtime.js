import {realtimeMessage} from "declare-common"
const {
    TEST_RUN_EXECUTION_COMPLETED
} = realtimeMessage.Types

export default (state, action) => {
    if(action.type === TEST_RUN_EXECUTION_COMPLETED) {
        const {
            testRunID, batchID
        } = action
        const curRun = state.testRuns[testRunID]
        const newRun = {
            ...curRun,
            reportBatches: curRun.reportBatches
                .concat([batchID])
        }

        return {
            ...state,
            testRuns: {
                ...state.testRuns,
                [testRunID]: newRun
            }
        }
    } else {
        return state
    }
}

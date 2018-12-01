import {fetchReportBatch} from "./ReportBatch"
import {realtimeMessage}  from "declare-common"
const {
    TEST_RUN_EXECUTION_COMPLETED
} = realtimeMessage.Types

export default event => async (dispatch) => {
    if(event.type === TEST_RUN_EXECUTION_COMPLETED) {
        await dispatch(event)
        await dispatch(fetchReportBatch(event.batchID))
    }
}

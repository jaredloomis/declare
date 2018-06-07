import {
    REPORT_BATCH_FETCH
} from "../actions/Types"

export default (state, action) => {
    if(action.type === REPORT_BATCH_FETCH) {
        return {
            ...state,
            reportBatches: {
                ...state.reportBatches,
                [action.id]: action.reportBatch
            }
        }
    } else {
        return state
    }
}

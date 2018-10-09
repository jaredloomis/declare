import gql from "graphql-tag"
import client from "../graphQL/Client"
import {
    REPORT_BATCH_FETCH
} from "./Types"
import {handleError} from "./Error"
import Fragments from "../graphQL/Fragments"

const fragments = Fragments.reportBatch

export const fetchReportBatch = id => async (dispatch, getState) => {
    const token = getState().activeToken
    const reportBatchRes = await client(token).query({
        query: gql`query ($id: ID!) {
                reportBatch(id: $id) {
                    ...FullReportBatch
                }
            }
        
            ${fragments.full}`,
        variables: {id}
    })
    const res         = reportBatchRes.data.reportBatch
    const reportBatch = res.data
    const error       = res.error

    if(error) {
        return dispatch(handleError(error, "Couldn't fetch report batch."))
    }

    dispatch({
        type: REPORT_BATCH_FETCH,
        id, reportBatch
    })

    return reportBatch
}

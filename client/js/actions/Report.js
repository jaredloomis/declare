import gql from "graphql-tag"
import client from "../graphQL/Client"
import {
    REPORT_FETCH
} from "./Types"
import Fragments from "../graphQL/Fragments"
import {registerListener} from "../lib/socket"

const fragments = Fragments.report
    /*
let watchingReports = false
export const watchReports = (options={}) => async (dispatch, getState) => {
    if(watchingReports) return
    watchingReports = true
    let reportCount = 0

    const unsubscribe = registerListener(event => {
        console.log(event)
        const {data} = event
        const report = JSON.parse(data)

        dispatch({
            type: REPORT_FETCH,
            report,
            reportID: report._id
        })

        ++reportCount
        if(options.maxCount && reportCount > options.maxCount) {
            unsubscribe()
            watchingReports = false
        }
    })
        /*
    const token = getState().activeToken
    const sub = client(token, {webSocket: true}).subscribe({
        query: gql`subscription {
            reports {
                ...FullReportList
            }
        }
        ${fragments.fullList}`
    }).subscribe({
        next(report) {
            console.log("RECEIVED WS REPORT")
            console.log(report)
            dispatch({
                type: REPORT_FETCH,
                report,
                reportID: report._id
            })

            ++reportCount
            if(options.maxCount && reportCount > options.maxCount) {
                sub.unsubscribe()
                watchingReports = false
            }
        }
    })

}
*/

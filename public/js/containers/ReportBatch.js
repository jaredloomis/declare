import Promise      from "bluebird"
import React        from "react"
import {
    compose, withState, lifecycle, setDisplayName
} from "recompose"

import {fetchReport}      from "../actions/Report"
import {fetchReportBatch} from "../actions/ReportBatch"
import VerticalTabs       from "../components/base/VerticalTabs"
import Report             from "./Report"
import withReduxDispatch  from "./WithReduxDispatch"
import withReduxState     from "./WithReduxState"

const ReportBatch = props => {
    const {
        // Passed in props
        batchID,
        // State props
        selectedReport, setSelectedReport,
        // Redux props
        reports, reportBatches
    } = props

    const batch = reportBatches[batchID]
    const tabs  = batch.reports.map(id => reports[id].name)

    return <VerticalTabs tabs={tabs} onTabSelect={setSelectedReport}>
        <Report reportID={batch.reports[selectedReport]}/>
    </VerticalTabs>
}

const enhance = compose(
    withReduxDispatch({
        fetchReport: {
            parameterized: fetchReport
        },
        fetchReportBatch: {
            parameterized: fetchReportBatch
        }
    }),
    withReduxState(["reports", "reportBatches"]),
    lifecycle({
        componentDidMount() {
            this.props.fetchReportBatch(this.props.batchID)
            .then(batch =>
                Promise.all(batch.reports.map(this.props.fetchReport))
            )
        }
    }),
    withState("selectedReport", "setSelectedReport", 0),
    setDisplayName("ReportBatch")
)

export default enhance(ReportBatch)

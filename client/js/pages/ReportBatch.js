import React from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {fetchReportBatch} from "../actions/ReportBatch"
import {fetchTestRun}     from "../actions/TestRun"

import Container            from "../components/base/Container"
import Section              from "../components/base/Section"
import Breadcrumb           from "../components/base/Breadcrumb"
import Button               from "../components/base/Button"
import DateString           from "../components/base/DateString"
import withReduxState       from "../containers/WithReduxState"
import withReduxDispatch    from "../containers/WithReduxDispatch"
import ReportBatchContainer from "../containers/ReportBatch"

const ReportBatchBase = props => {
    const batch   = props.reportBatches && props.reportBatches[props.batchID]
    const testRun = batch && props.testRuns && props.testRuns[batch.testRun]

    const crumbs = testRun && [
        {text: "Test Runs", url: "#/TestRuns"},
        {text: testRun.name, url: `#/TestRun/${testRun._id}`},
        {text: <span>Report Batch: <DateString date={batch.startTime}/></span>}
    ]

    return <Section><Container>
        <Breadcrumb crumbs={crumbs}/>
        <ReportBatchContainer {...props}/>
    </Container></Section>
}

const enhance = compose(
    withReduxDispatch({
        fetchReportBatch: {
            parameterized: fetchReportBatch
        },
        fetchTestRun: {
            parameterized: fetchTestRun
        }
    }),
    withReduxState(["reportBatches", "testRuns"]),
    lifecycle({
        async componentWillMount() {
            const batch = await this.props.fetchReportBatch(this.props.batchID)
            return this.props.fetchTestRun(batch.testRun)
        }
    }),
    setDisplayName("ReportBatchPage")
)

export default enhance(ReportBatchBase)

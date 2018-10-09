import React from "react"
import {
    compose, lifecycle, setDisplayName, withState
} from "recompose"

import {listTestRuns, createTestRun} from "../actions/TestRun"
import {fetchReportBatch}            from "../actions/ReportBatch"
import {fetchReport}                 from "../actions/Page"

import Section           from "../components/base/Section"
import Container         from "../components/base/Container"

import TestRunCreate     from "../containers/TestRunCreate"
import TestRunContainer  from "../containers/TestRun"
import withReduxState    from "../containers/WithReduxState"
import withReduxDispatch from "../containers/WithReduxDispatch"

const TestRun = props => {
    return <Section><Container>
        <TestRunContainer testRunID={props.testRunID}/>
    </Container></Section>
}

const enhance = compose(
    withReduxState(["testRuns", "reportBatches", "reports"]),
    withReduxDispatch({
        listTestRuns,
        createTestRun: {
            parameterized: createTestRun
        },
        fetchReportBatch: {
            parameterized: fetchReportBatch
        },
        fetchReport: {
            parameterized: fetchReport
        }
    }),
    withState("createInProgress", "setCreateInProgress", false),
    lifecycle({
        async componentWillMount() {
            const testRuns = await this.props.listTestRuns()
            for(const testRun of testRuns) {
                const batches = await Promise.all(
                    testRun.reportBatches.map(this.props.fetchReportBatch)
                )

                for(const batch of batches) {
                    await Promise.all(
                        batch.reports.map(this.props.fetchReport)
                    )
                }
            }
        }
    }),
    setDisplayName("TestRun")
)

export default enhance(TestRun)

import React from "react"
import {
    compose, lifecycle, setDisplayName, withState
} from "recompose"

import {listTestRuns, createTestRun} from "../actions/TestRun"
import {fetchReportBatch}            from "../actions/ReportBatch"
import {fetchReport}                 from "../actions/Page"

import Box               from "../components/base/Box"
import DateString        from "../components/base/DateString"
import Heading           from "../components/base/Heading"
import Button            from "../components/base/Button"
import Title             from "../components/base/Title"
import Link              from "../components/base/Link"
import Table             from "../components/base/Table"
import Section           from "../components/base/Section"
import Container         from "../components/base/Container"
import Modal             from "../components/base/Modal"

import TestRunCreate     from "../containers/TestRunCreate"
import TestRunContainer  from "../containers/TestRun"
import withReduxState    from "../containers/WithReduxState"
import withReduxDispatch from "../containers/WithReduxDispatch"

const TestRun = props => {
    return <Section><Container>
        <TestRunContainer testRunID={props.testRunID}/>
        {/*
        <Table header={["Name", "Last Run", "Status"]} data={tableData}/>
        <br/>
        <Button type="primary" onClick={beginCreate}>Create Test Run</Button>
        <Modal active={props.createInProgress} onClose={closeCreate}>
            <Box>
                <Heading>Create Test Run</Heading>
                <TestRunCreate/>
            </Box>
        </Modal>
        */}
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

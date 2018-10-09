import React from "react"
import {
    compose, lifecycle, setDisplayName, withState
} from "recompose"

import {listEnvironments, createEnvironment} from "../actions/Environment"
import {fetchReportBatch}            from "../actions/ReportBatch"
import {fetchReport}                 from "../actions/Page"

import Section           from "../components/base/Section"
import Container         from "../components/base/Container"

import EnvironmentCreate     from "../containers/EnvironmentCreate"
import EnvironmentContainer  from "../containers/Environment"
import withReduxState    from "../containers/WithReduxState"
import withReduxDispatch from "../containers/WithReduxDispatch"

const Environment = props => {
    return <Section><Container>
        <EnvironmentContainer {...props}/>
    </Container></Section>
}

const enhance = compose(
    withReduxState(["testRuns", "reportBatches", "reports"]),
    withReduxDispatch({
        listEnvironments,
        createEnvironment: {
            parameterized: createEnvironment
        },
        fetchReportBatch: {
            parameterized: fetchReportBatch
        },
        fetchReport: {
            parameterized: fetchReport
        }
    }),
    lifecycle({
        async componentWillMount() {
            /*
            const testRuns = await this.props.listEnvironments()
            for(const testRun of testRuns) {
                const batches = await Promise.all(
                    testRun.reportBatches.map(this.props.fetchReportBatch)
                )

                for(const batch of batches) {
                    await Promise.all(
                        batch.reports.map(this.props.fetchReport)
                    )
                }
            }*/
        }
    }),
    setDisplayName("EnvironmentPage")
)

export default enhance(Environment)

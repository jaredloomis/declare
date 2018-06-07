import React from "react"
import {
    compose, lifecycle, setDisplayName, withState
} from "recompose"

import {listTestRuns, createTestRun}  from "../actions/TestRun"

import Row               from "../components/base/Row"
import Column            from "../components/base/Column"
import Link              from "../components/base/Link"

import TestRunCreate     from "./TestRunCreate"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const TestRunList = props => {
    const testRunsView = Object.keys(props.testRuns).map(id =>
        <Row>
            <Column>
                <Link to={`#/TestRun/${id}`} key={id}>
                    {props.testRuns[id].name}
                </Link>
            </Column>
        </Row>
    )

    return [
        ...testRunsView,
        <TestRunCreate key="testrunlist-create"/>
    ]
}

const enhance = compose(
    withReduxState(["testRuns"]),
    withReduxDispatch({
        listTestRuns,
        createTestRun: {
            parameterized: createTestRun
        }
    }),
    withState("createInProgress", "setCreateInProgress", false),
    lifecycle({
        componentDidMount() {
            this.props.listTestRuns()
        }
    }),
    setDisplayName("TestRunList")
)

export default enhance(TestRunList)

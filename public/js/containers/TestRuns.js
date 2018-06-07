import React from "react"
import {
    compose, lifecycle, setDisplayName, withState
} from "recompose"

import {listTestRuns, createTestRun}  from "../actions/TestRun"

import Link                 from "../components/base/Link"
import Modal                from "../components/base/Modal"

import withReduxState       from "./WithReduxState"
import withReduxDispatch    from "./WithReduxDispatch"

const TestRunList = props => {
    const closeModal = () => props.setCreateInProgress(false)

    const testRunsView = props.testRuns.map(({_id, name}) =>
        <Link to={`#/TestRuns/${_id}`}>{name}</Link>
    )

    return [
        ...testRunsView,
        <Modal active={props.createInProgress} onClose={closeModal} key="testrunlist-modal">
        </Modal>
    ]
}

const enhance = compose(
    /*
    withReduxState(["testRuns"]),
    withReduxDispatch({
        listTestRuns,
        createTestRun: {
            parameterized: createTestRun
        }
    }),
    withState("createInProgress", "setCreateInProgress", false),
    */
    lifecycle({
        componentDidMount() {
            this.props.listTestRuns()
        }
    }),
    setDisplayName("ProductRunList")
)

export default enhance(TestRunList)

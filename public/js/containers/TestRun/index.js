import Promise from "bluebird"

import React from "react"
import {
    setDisplayName, withState, lifecycle, compose
} from "recompose"

import Box               from "../../components/base/Box"
import Button            from "../../components/base/Button"
import Panel             from "../../components/base/Panel"
import AddonsField       from "../../components/base/AddonsField"
import SelectedTestList  from "./SelectedTestList"
import withReduxState    from "../WithReduxState"
import withReduxDispatch from "../WithReduxDispatch"
import ReportBatch       from "../ReportBatch"

import {TEST_TYPE}       from "../../../../common/TestRun"
import {
    fetchTestRun, updateTestRun, executeTestRun
} from "../../actions/TestRun"
import {listCustomTests}  from "../../actions/CustomTest"
import {fetchReportBatch} from "../../actions/ReportBatch"

/**
 * == Props ==
 * - testRunID : String
 */
const TestRun = props => {
    const {
        // Required parent-proved props
        testRunID,
        // Redux-provided props
        testRuns, customTests,
        // State props
        state, setState
    } = props

    // State
    const {selectedTests, deselectedTests} = state

    const testRun = testRuns[testRunID]

    if(!testRun) {
        return <span>Loading...</span>
    }

    const computedSelectedTests = (testRun.tests || [])
        .concat(selectedTests)
        .filter(test => deselectedTests.indexOf(test) === -1)

    const tabs = [{
        title: "Custom Tests",
        blocks: !customTests ? [] : Object.keys(customTests)
            .filter(testID =>
                computedSelectedTests.filter(test => test.customTestID === testID).length === 0
            )
            .map(testID =>
                <span key={testID}>{customTests[testID].name}</span>
            )
    }]

    const batches = (testRun.reportBatches || []).map(batchID =>
        <ReportBatch batchID={batchID} key={batchID}/>
    )

    const selectTest = (tabI, itemI) => {
        if(tabI === 0) {
            const testID = Object.keys(customTests)[itemI]
            const test   = {
                testType: TEST_TYPE.CUSTOM_TEST,
                customTestID: testID
            }

            const stateUpdate = {
                ...state,
                deselectedTests: deselectedTests.filter(item => item.customTestID !== testID)
            }

            if(testRun.tests.filter(item => item.customTestID === testID).length === 0) {
                stateUpdate.selectedTests = selectedTests.concat([test])
            }

            setState(stateUpdate)
        }
    }

    const deselectTest = itemI =>
        setState({
            ...state,
            deselectedTests: deselectedTests.concat([computedSelectedTests[itemI]]),
            selectedTests: selectedTests.filter((item, i) => i !== itemI)
        })

    const save = () =>
        props.updateTestRun(testRunID, {
            ...testRun,
            tests: computedSelectedTests
        }).then(() =>
            setState({
                ...state,
                deselectedTests: [],
                selectedTests:   []
            })
        )

    const execute = () =>
        props.executeTestRun(testRunID)

    return <div>
        <Box>
            <SelectedTestList tests={computedSelectedTests} customTests={customTests}
                onDeselect={deselectTest}/>
        </Box>
        <Panel title={testRun.name} tabs={tabs} onBlockClick={selectTest}/>
        <AddonsField>
            <Button type="info"    onClick={save}>Save</Button>
            <Button type="primary" onClick={execute}>Execute</Button>
        </AddonsField>
        {batches}
    </div>
}

const enhance = compose(
    setDisplayName("TestRun"),
    withState("state", "setState", {
        selectedTests:   [],
        deselectedTests: []
    }),
    withReduxState(["testRuns", "customTests"]),
    withReduxDispatch({
        fetchTestRun: {
            parameterized: fetchTestRun
        },
        updateTestRun: {
            parameterized: updateTestRun
        },
        executeTestRun: {
            parameterized: executeTestRun
        },
        listCustomTests,
        fetchReportBatch: {
            parameterized: fetchReportBatch
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.listCustomTests()
            this.props.fetchTestRun(this.props.testRunID)
            .then(testRun => Promise.all(
                (testRun.reportBatches || []).map(this.props.fetchReportBatch)
            ))
        }
    })
)

export default enhance(TestRun)

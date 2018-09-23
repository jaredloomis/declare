import Promise from "bluebird"

import React from "react"
import {
    setDisplayName, withState, lifecycle, compose
} from "recompose"

import Row               from "../../components/base/Row"
import Column            from "../../components/base/Column"
import Heading           from "../../components/base/Heading"
import Group             from "../../components/base/Group"
import Title             from "../../components/base/Title"
import Box               from "../../components/base/Box"
import Button            from "../../components/base/Button"
import List              from "../../components/base/List"
import Link              from "../../components/base/Link"
import DateString        from "../../components/base/DateString"
import AddonsField       from "../../components/base/AddonsField"
import SelectedTestList  from "./SelectedTestList"
import withReduxState    from "../WithReduxState"
import withReduxDispatch from "../WithReduxDispatch"
import ReportBatch       from "../ReportBatch"
import EnvironmentSelect from "../EnvironmentSelect"

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

    const unselectedTests = Object.keys(customTests)
        .filter(testID =>
            computedSelectedTests.filter(test =>
                test.customTestID === testID
            ).length === 0
        )

    const selectTest = (itemI) => {
        const testID = unselectedTests[itemI]
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

    const deselectTest = itemI => {
        const {customTestID} = computedSelectedTests[itemI]
        setState({
            ...state,
            deselectedTests: deselectedTests.concat([computedSelectedTests[itemI]]),
            selectedTests: selectedTests.filter(item => item.customTestID !== customTestID)
        })
    }

    const changeEnvironment = environmentID =>
        setState({
            ...state,
            environment: environmentID
        })

    const save = () =>
        props.updateTestRun(testRunID, {
            ...testRun,
            tests: computedSelectedTests,
            environment: state.environment || testRun.environment
        }).then(() =>
            setState({
                ...state,
                deselectedTests: [],
                selectedTests:   []
            })
        )

    const execute = () =>
        props.executeTestRun(testRunID)

    const rawBatches  = testRun.reportBatches || []
    const batchCount  = rawBatches.length
    const simpBatches = rawBatches.slice(batchCount-5, batchCount)
    simpBatches.reverse()
    const batches = <List>
        {simpBatches.map(batchID => {
            const batch = props.reportBatches[batchID]
            return <Link to={`#/ReportBatch/${batchID}`} key={batchID}>
                {batch ? <DateString date={batch.startTime}/> : "Loading..."}
            </Link>
        })}
    </List>

    return <div>
        <Title leftLabel={<span><Link to="#/TestRuns">Test Runs</Link>/</span>}>
            {testRun.name}
        </Title>
        <br/>
        <Row>
            <Column>
                <Box>
                    <SelectedTestList
                        tests={computedSelectedTests}
                        customTests={customTests}
                        onDeselect={deselectTest}/>
                </Box>
            </Column>
            <Column>
                <Box>
                <Heading>Test Library</Heading>
                <List selectable search onSelect={selectTest}>
                    {Object.keys(customTests)
                        .filter(testID =>
                            computedSelectedTests.filter(test =>
                                test.customTestID === testID
                            ).length === 0
                        )
                        .map(testID =>
                            customTests[testID].name
                        )}
                </List>
                </Box>
            </Column>
        </Row>
        <Group>
            <EnvironmentSelect onChange={changeEnvironment}
                defaultValue={testRun.environment}/>
        </Group>
        <Group>
            <Button type="info" onClick={save}>Save</Button>
            <Button type="primary" onClick={execute}>Execute</Button>
        </Group>
        <Heading>Previous Runs</Heading>
        {batches}
    </div>
}

const enhance = compose(
    setDisplayName("TestRun"),
    withState("state", "setState", {
        selectedTests:   [],
        deselectedTests: []
    }),
    withReduxState(["testRuns", "customTests", "reportBatches"]),
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

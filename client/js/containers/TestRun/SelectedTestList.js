import React from "react"
import {
    setDisplayName, lifecycle, compose
} from "recompose"

import Heading           from "../../components/base/Heading"
import List              from "../../components/base/List"
import withReduxState    from "../WithReduxState"
import withReduxDispatch from "../WithReduxDispatch"

import {listCustomTests} from "../../actions/CustomTest"
import {TEST_TYPE}       from "../../../../common/TestRun"

const SelectedTestList = ({tests, onDeselect, customTests}) => {
    return <div>
        <Heading>Selected Tests</Heading>
        <List selectable onSelect={onDeselect}>
            {tests.map(test => {
                if(!test)
                    return "Null Test!!!"
                else if(test && test.testType === TEST_TYPE.CUSTOM_TEST)
                    return customTests[test.customTestID] && customTests[test.customTestID].name
                else `Unknown Test Type: ${test.testType}`
            })}
        </List>
    </div>
}

const enhance = compose(
    setDisplayName("SelectedTestList"),
    withReduxState(["customTests"]),
    withReduxDispatch({
        listCustomTests
    }),
    lifecycle({
        componentDidMount() {
            if(!this.customTests)
                this.props.listCustomTests()
        }
    })
)

export default enhance(SelectedTestList)

import React from "react"
import {
    setDisplayName, lifecycle, compose
} from "recompose"

import Title             from "../../components/base/Title"
import Row               from "../../components/base/Row"
import Column            from "../../components/base/Column"
import withReduxState    from "../WithReduxState"
import withReduxDispatch from "../WithReduxDispatch"

import {listCustomTests} from "../../actions/CustomTest"

const SelectedTestList = ({tests, onDeselect, customTests}) => {
    return <div>
        <Title>Selected Tests</Title>
        {tests.map((test, testI) => {
            if(!test)
                <Row key={testI}>
                    <Column>Null Test!!!</Column>
                </Row>
            else if(test && test.testType === "customTest")
                return <Row key={test.customTestID} onClick={() => onDeselect(testI)}>
                    <Column>
                        {customTests[test.customTestID] && customTests[test.customTestID].name}
                    </Column>
                </Row>
            else <Row key={testI}>
                <Column>Unknown Test Type!!! {test.testType}</Column>
            </Row>
        })}
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

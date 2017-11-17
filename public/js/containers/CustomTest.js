import React          from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {
    fetchCustomTest, updateCustomTestAction, addCustomTestAction,
    removeCustomTestAction, updateCustomTestInfo, removeCustomTest,
    executeCustomTest
} from "../actions/CustomTest"
import CustomTestComponent from "../components/CustomTest"
import withReduxState      from "./WithReduxState"
import withReduxDispatch   from "./WithReduxDispatch"

const CustomTestBase = props => {
    const {
        customTestID, customTests
    } = props
    const customTest   = customTests[customTestID]

    const nameChange = event => {
        props.updateCustomTestInfo(customTestID, {name: event.target.value})
    }
    const actionChange = actionI => action => {
        props.updateCustomTestAction(customTestID, actionI, action)
    }
    const actionAdd    = () => {
        props.addCustomTestAction(customTestID, {
            actionType: null,
            values: {}
        })
    }
    const actionRemove = actionI => {
        props.removeCustomTestAction(customTestID, actionI)
    }
    const execute = () => {
        props.executeCustomTest(customTestID)
    }
    const remove = () => {
        props.removeCustomTest(customTestID)
    }

    return <CustomTestComponent {...customTest}
                onNameChange={nameChange}
                onActionChange={actionChange}
                onActionRemove={actionRemove}
                onActionAdd={actionAdd}
                onExecute={execute}
                onRemove={remove}/>
}

const enhance = compose(
    withReduxDispatch({
        fetchCustomTest: {
            parameterized: fetchCustomTest
        },
        updateCustomTestInfo: {
            parameterized: updateCustomTestInfo
        },
        updateCustomTestAction: {
            parameterized: updateCustomTestAction
        },
        addCustomTestAction: {
            parameterized: addCustomTestAction
        },
        removeCustomTestAction: {
            parameterized: removeCustomTestAction
        },
        removeCustomTest: {
            parameterized: removeCustomTest
        },
        executeCustomTest: {
            parameterized: executeCustomTest
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.fetchCustomTest(this.props.customTestID)
        }
    }),
    withReduxState(["customTests"]),
    setDisplayName("CustomTest")
)

export default enhance(CustomTestBase)

import React          from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {
    fetchCustomTest, updateCustomTestAction, addCustomTestAction,
    removeCustomTestAction, updateCustomTestInfo, removeCustomTest,
    executeCustomTest, insertCustomTestAction
} from "../actions/CustomTest"
import CustomTestComponent from "../components/CustomTest"
import withReduxState      from "./WithReduxState"
import withReduxDispatch   from "./WithReduxDispatch"

const CustomTestBase = props => {
    const {
        customTestID, customTests, productID
    } = props
    const customTest   = customTests[customTestID]

    const nameChange = name => {
        props.updateCustomTestInfo(customTestID, {name})
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
    const actionInsert = actionI => {
        props.insertCustomTestAction(customTestID, actionI)
    }
    const execute = () => {
        props.executeCustomTest(customTestID)
    }
    const remove = () => {
        props.removeCustomTest(customTestID)
    }

    return <CustomTestComponent {...customTest}
                productID={productID}
                onNameChange={nameChange}
                onActionChange={actionChange}
                onActionRemove={actionRemove}
                onActionInsert={actionInsert}
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
        insertCustomTestAction: {
            parameterized: insertCustomTestAction
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
    setDisplayName("CustomTestContainer")
)

export default enhance(CustomTestBase)

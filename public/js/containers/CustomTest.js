import React          from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {fetchCustomTest, updateCustomTestAction} from "../actions/CustomTest"
import CustomTestComponent from "../components/CustomTest"
import withReduxState      from "./WithReduxState"
import withReduxDispatch   from "./WithReduxDispatch"

const CustomTestBase = ({customTestID, customTests}) => {
    const customTest   = customTests[customTestID]
    const actionChange = actionI => action => {
        this.props.updateCustomTestAction(customTestID, actionI, action)
    }

    return <CustomTestComponent {...customTest}
                onActionChange={actionChange}
                onActionRemove={() => {}}
                onActionAdd={() => {}}/>
}

const enhance = compose(
    withReduxDispatch({
        fetchCustomTest: dispatch => id => fetchCustomTest(id)(dispatch),
        updateCustomTestAction
    }),
    lifecycle({
        componentDidMount() {
            this.props.fetchCustomTest()(this.props.customTestID)
        }
    }),
    withReduxState(["customTests"]),
    setDisplayName("CustomTest")
)

export default enhance(CustomTestBase)

import React from "react"
import {compose, setDisplayName} from "recompose"

import {acknowledgeError}   from "../actions/Error"
import ErrorModalComponent from "../components/ErrorModal"
import withReduxDispatch   from "./WithReduxDispatch"
import withReduxState      from "./WithReduxState"

const ErrorModalBase = props => {
    const close = () => {
        props.acknowledgeError()
    }

    return <ErrorModalComponent message={props.error}
            active={props.error}
            onClose={close}/>
}

const enhance = compose(
    withReduxDispatch({
        acknowledgeError
    }),
    withReduxState(["error"]),
    setDisplayName("ErrorModal")
)

export default enhance(ErrorModalBase)

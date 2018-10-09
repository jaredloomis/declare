import React from "react"
import {compose, setDisplayName} from "recompose"

import {acknowledgeError}   from "../actions/Error"
import Modal from "../components/base/Modal"
import withReduxDispatch   from "./WithReduxDispatch"
import withReduxState      from "./WithReduxState"

const ErrorModalBase = props => {
    const close = () => {
        props.acknowledgeError()
    }

    return <Modal type="error" active={props.error} onClose={close}>
        {props.error}
    </Modal>
}

const enhance = compose(
    withReduxDispatch({
        acknowledgeError
    }),
    withReduxState(["error"]),
    setDisplayName("ErrorModal")
)

export default enhance(ErrorModalBase)

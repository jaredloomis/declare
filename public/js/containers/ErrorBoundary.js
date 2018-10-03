import React from "react"
import {compose, setDisplayName, lifecycle, withState} from "recompose"

import {displayErrorMsg, handleError}   from "../actions/Error"
import withReduxDispatch   from "./WithReduxDispatch"
import withReduxState      from "./WithReduxState"

const ErrorBoundaryBase = ({error, children}) =>
    /*error ? <pre>{error.toString()}</pre> :*/ children

const enhance = compose(
    withReduxDispatch({
        /*
        displayErrorMsg: {
            parameterized: displayErrorMsg
        }*/
        handleError: {
            parameterized: handleError
        }
    }),
    withState("error", "setError", null),
    lifecycle({
        componentDidCatch(error, info) {
            this.props.handleError(error, info)
            //console.log(error)
            //this.props.displayErrorMsg(error)
            //this.props.setError(error)
        }
    }),
    setDisplayName("ErrorBoundary")
)

export default enhance(ErrorBoundaryBase)

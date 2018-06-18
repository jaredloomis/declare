import React from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {listEnvironments} from "../actions/Environment"
import Select             from "../components/base/Select"
import withReduxState     from "./WithReduxState"
import withReduxDispatch  from "./WithReduxDispatch"

const EnvironmentSelectBase = props => {
    const children = !props.environments ? null : Object.keys(props.environments)
        .map(inputTyID =>
            <span value={inputTyID} key={inputTyID}>
                {props.environments[inputTyID].name}
            </span>
        )
    return <Select label={props.label || "Environment"} {...props}>{children}</Select>
}

const enhance = compose(
    withReduxDispatch({
        listEnvironments
    }),
    lifecycle({
        componentDidMount() {
            this.props.listEnvironments()
        }
    }),
    withReduxState(["environments"]),
    setDisplayName("EnvironmentSelect")
)

export default enhance(EnvironmentSelectBase)

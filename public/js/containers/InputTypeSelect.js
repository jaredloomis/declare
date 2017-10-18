import React          from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {listInputTypes}  from "../actions/InputType"
import Select            from "../components/base/Select"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const InputTypeSelectBase = props => {
    const children = !props.inputTypes ? null : Object.keys(props.inputTypes).map(inputTyID =>
        <span value={inputTyID} key={inputTyID}>
            {props.inputTypes[inputTyID].name}
        </span>
    )
    return <Select label="Input Type" {...props}>{children}</Select>
}

const enhance = compose(
    withReduxDispatch({
        listInputTypes
    }),
    lifecycle({
        componentDidMount() {
            this.props.listInputTypes()
        }
    }),
    withReduxState(["inputTypes"]),
    setDisplayName("InputTypeSelect")
)

export default enhance(InputTypeSelectBase)

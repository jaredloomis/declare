import React          from "react"
import Select         from "../components/base/Select"
import withReduxState from "./WithReduxState"

const InputTypeSelect = withReduxState(["inputTypes"], props => {
    const children = !props.inputTypes ? null : Object.keys(props.inputTypes).map(inputTyID =>
        <span value={inputTyID} key={inputTyID}>
            {props.inputTypes[inputTyID].name}
        </span>
    )
    return <Select label="Input Type" {...props}>{children}</Select>
})

InputTypeSelect.displayName = "InputTypeSelect"

export default InputTypeSelect

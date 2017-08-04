import React          from "react"
import Select         from "../components/base/Select"
import withReduxState from "./WithReduxState"

export default withReduxState(["inputTypes"], props => {
    const children = props.inputTypes.map(inputTy =>
        <span value={inputTy._id}>{inputTy.name}</span>
    )
    return <Select {...props}>{children}</Select>
})

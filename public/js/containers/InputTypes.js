import React       from "react"
import {connect}   from "react-redux"
import {
    lifecycle, compose, withState
} from "recompose"

import InputType from "./InputType"
import {
    listInputTypes, createInputType
}                from "../actions/InputType"
import Button    from "../components/base/Button"
import TextInput from "../components/base/TextInput"

const InputTypesBase = props => {
    const {inputTypes, createType, newName, setNewName} = props
    // Current InputType list DOM
    const inTyKeys = Object.keys(inputTypes)
    const inTyDOMs = !inTyKeys.length ?
        <span>No Input Types Found...</span> :
        inTyKeys.map(inTyID =>
            <InputType key={inTyID} inputTypeID={inTyID}/>
        )
    // When new name text changes, update state
    const changeName = event => setNewName(event.target.value)
    // Display list and add controls
    return <div>
        {inTyDOMs}
        <Button onClick={() => createType(newName)}>+</Button>
        <TextInput onChange={changeName} label="Input Type Name"/>
    </div>
}

const enhance = compose(
    lifecycle({
        componentDidMount() {
            this.props.listTypes()
        }
    }),
    withState("newName", "setNewName", "")
)
const InputTypes = enhance(InputTypesBase)

InputTypes.displayName = "InputTypes"

const mapStateToProps = (state, ownProps) => {
    return {inputTypes: state.inputTypes}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        listTypes() {
            dispatch(listInputTypes())
        },
        createType(name) {
            dispatch(createInputType(name))
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(InputTypes)

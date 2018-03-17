import React       from "react"
import {connect}   from "react-redux"
import {
    lifecycle, compose, withState
} from "recompose"

import InputType   from "./InputType"
import {
    listInputTypes, createInputType
}                  from "../actions/InputType"
import Button      from "../components/base/Button"
import TextInput   from "../components/base/TextInput"
import AddonsField from "../components/base/AddonsField"
import Title       from "../components/base/Title"

import bulma       from "../../style/bulma.js"

const InputTypesBase = props => {
    const {inputTypes, createType, newName, setNewName} = props
    // Current InputType list DOM
    const inTyKeys = Object.keys(inputTypes)
    const inTyDOMs = !inTyKeys.length ?
        <span>No Input Types Found...</span> :
        inTyKeys.map(inTyID =>
            <div className={bulma.box} key={inTyID}>
                <InputType inputTypeID={inTyID}/>
            </div>
        )
    // Display list and add controls
    return <div>
        <Title size="2">Input Types</Title>
        {inTyDOMs}
        <AddonsField>
            <TextInput onChange={setNewName} label="Input Type Name"/>
            <Button onClick={() => createType(newName)} type="info" inline={true}>
                Create Input Type
            </Button>
        </AddonsField>
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
            dispatch(listInputTypes)
        },
        createType(name) {
            dispatch(createInputType(name))
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(InputTypes)

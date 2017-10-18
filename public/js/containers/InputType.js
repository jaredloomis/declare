import {connect} from "react-redux"

import {
    updateInputTypeConstraint, addConstraint, saveInputType,
    removeInputType, removeInputTypeConstraint, updateInputType
} from "../actions/InputType"
import InputType from "../components/InputType"

const mapStateToProps = (state, ownProps) => {
    return state.inputTypes[ownProps.inputTypeID]
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onConstraintAdd() {
            dispatch(addConstraint(ownProps.inputTypeID))
        },
        onConstraintChange(index, value) {
            dispatch(
                updateInputTypeConstraint(ownProps.inputTypeID, index, value)
            )
        },
        onConstraintRemove(index) {
            dispatch(
                removeInputTypeConstraint(ownProps.inputTypeID, index)
            )
        },
        onSave() {
            dispatch(saveInputType(ownProps.inputTypeID))
        },
        onDelete() {
            dispatch(removeInputType(ownProps.inputTypeID))
        },
        onNameChange(name) {
            dispatch(updateInputType(ownProps.inputTypeID, {name}))
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(InputType)

import {connect} from "react-redux"

import {
    updateInputTypeConstraint, addConstraint, saveInputType,
    removeInputType
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
        onSave() {
            dispatch(saveInputType(ownProps.inputTypeID))
        },
        onDelete() {
            dispatch(removeInputType(ownProps.inputTypeID))
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(InputType)

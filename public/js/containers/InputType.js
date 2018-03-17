import {connect} from "react-redux"
import {
    compose, setDisplayName, lifecycle
} from "recompose"

import {
    updateInputTypeConstraint, addConstraint, saveInputType,
    removeInputType, removeInputTypeConstraint, updateInputType, fetchInputType
} from "../actions/InputType"
import InputType from "../components/InputType"

const mapStateToProps = (state, ownProps) => {
    return state.inputTypes[ownProps.inputTypeID] || {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchInputType() {
            dispatch(fetchInputType(ownProps.inputTypeID))
        },
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

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            if(!this.props._id) {
                this.props.fetchInputType()
            }
        }
    }),
    setDisplayName("InputTypeContainer")
)

export default enhance(InputType)

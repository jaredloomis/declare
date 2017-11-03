import {connect}          from "react-redux"

import {updateCustomTestAction} from "../actions/Element"
import Element         from "../components/Element"

const mapStateToProps = (state, ownProps) => {
    return {
        defaultValue: state.elements[ownProps.elementID]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSave() {
            dispatch(saveElement(ownProps.elementID))
        },
        onChange(element) {
            dispatch(updateElement(ownProps.elementID, element))
        },
        onRemove() {
            dispatch(removeElement(ownProps.elementID))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Element)

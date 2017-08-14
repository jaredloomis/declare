import {connect}          from "react-redux"

import {updateElement, saveElement} from "../actions/Element"
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
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Element)

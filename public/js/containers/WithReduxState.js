import {connect}          from "react-redux"
import {deepGet, deepSet} from "../lib/Deep"

const mapStateToProps = fields => (state, ownProps) => {
    // Copy over all requested fields
    return fields.reduce((field, acc) => {
        const normalizedField = typeof field === "string" ?
            field.split(".") :
            [].concat(...field)
        return deepSet(normalizedField, deepGet(normalizedField, state), acc)
    }, {...ownProps})
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default (fields, BaseComponent) => connect(
    mapStateToProps(fields),
    mapDispatchToProps
)(BaseComponent)

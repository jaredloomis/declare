import {connect}          from "react-redux"
import {deepGet, deepSet} from "../lib/Deep"

const mapStateToProps = fields => (state, ownProps) => {
    // Copy over all requested fields
    return fields.reduce((acc, field) => {
        const normalizedField = typeof field === "string" ?
            field.split(".") :
            [].concat(...field)
        return deepSet(normalizedField, deepGet(normalizedField, state), acc)
    }, {})
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default (fields, BaseComponent) => connect(
    mapStateToProps(fields),
    mapDispatchToProps
)(BaseComponent)

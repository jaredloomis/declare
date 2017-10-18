import {connect}          from "react-redux"
import {compose, setDisplayName} from "recompose"
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

export default fields => BaseComponent => compose(
        setDisplayName(`withReduxState(${BaseComponent.displayName})`),
        connect(mapStateToProps(fields), mapDispatchToProps)
    )(BaseComponent)

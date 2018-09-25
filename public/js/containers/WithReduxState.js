import {connect}          from "react-redux"
import {compose, setDisplayName} from "recompose"
import {deepGet, deepSet} from "../lib/Deep"

const mapStateToProps = (...fields) => (state, ownProps) => {
    if(fields.length === 1 && Array.isArray(fields[0])) {
        fields = fields[0]
    }

    // Copy over all requested fields
    return fields.reduce((acc, field) => {
        if(typeof field === "object") {
            const keys = Object.keys(field)
            return keys.reduce((a, key) => {
                const fieldVal = field[key]
                const value    = typeof(fieldVal) === "string" ?
                    deepGet(fieldVal.split("."), state)        :
                    fieldVal(state)

                return {
                    ...a,
                    [key]: value
                }
            }, acc)
        } else {
            const normalizedField = typeof field === "string" ?
                field.split(".") :
                [].concat(...field)
            return deepSet(normalizedField, deepGet(normalizedField, state), acc)
        }
    }, {})
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default fields => BaseComponent => compose(
        setDisplayName(`withReduxState(${BaseComponent.displayName})`),
        connect(mapStateToProps(fields), mapDispatchToProps)
    )(BaseComponent)

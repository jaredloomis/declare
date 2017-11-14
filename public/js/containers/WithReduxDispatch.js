/**
 * A HOC to allow for quicker declaration of Action dependencies.
 * Accepts an object, where keys are prop names, and values are
 * actions that should be dispatched when corresponding prop
 * is called. Function should be wrapped in {parameterized: _}
 * if it recieves arguments (there's no way to determine this)
 * automatically.
 *
 * ex.
 * > withReduxDispatch({
 * >     fetchCustomTest: {
 * >         parameterized: fetchCustomTest
 * >     },
 * >     updateCustomTestAction
 * > })
 */

import {connect}          from "react-redux"
import {compose, setDisplayName} from "recompose"

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = actions => (dispatch, ownProps) => {
    const props = Object.keys(actions).reduce((acc, actionKey) => {
        const action = actions[actionKey]
        if(action.parameterized) {
            const actionFunc = action.parameterized
            return {
                ...acc,
                [actionKey]: (...args) => dispatch(actionFunc(...args))
            }
        } else {
            return {
                ...acc,
                [actionKey]: () => dispatch(action)
            }
        }
    }, {})
    return props
}

export default actions => BaseComponent => compose(
        setDisplayName(`withReduxDispatch(${BaseComponent.displayName})`),
        connect(mapStateToProps, mapDispatchToProps(actions))
    )(BaseComponent)

import {connect}          from "react-redux"
import {compose, setDisplayName} from "recompose"

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = actions => (dispatch, ownProps) => {
    return Object.keys(actions).reduce((acc, actionKey) => {
        return {
            ...acc,
            [actionKey]: () => dispatch(actions[actionKey])
        }
    }, {})
}

export default actions => BaseComponent => compose(
        setDisplayName(`withReduxDispatch(${BaseComponent.displayName})`),
        connect(mapStateToProps, mapDispatchToProps(actions))
    )(BaseComponent)

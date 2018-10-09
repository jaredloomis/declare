import {withState, withProps, compose} from "recompose"

/**
 * This is equivalent to recompose withState, but with shallow merging.
 */
export default (stateName, setStateName, initState) => compose(
    withState(stateName, "_" + setStateName, initState),
    withProps(props => ({
        [setStateName]: state =>
            props["_" + setStateName]({
                ...props.state,
                ...state
            })
    }))
)

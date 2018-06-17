import {
    compose, lifecycle, withProps
} from "recompose"

import {
    fetchEnvironment, updateEnvironment, saveEnvironment
} from "../actions/Environment"

import Environment        from "../components/Environment"
import withReduxState     from "./WithReduxState"
import withReduxDispatch  from "./WithReduxDispatch"

const enhance = compose(
    withReduxState(["environments"]),
    withReduxDispatch({
        fetchEnvironment: {
            parameterized: fetchEnvironment
        },
        updateEnvironment: {
            parameterized: updateEnvironment
        },
        saveEnvironment: {
            parameterized: saveEnvironment
        }
    }),
    withProps(props => ({
        onVariableChange(variableI, update) {
            const env = props.environments[props.environmentID]
            const newVars = env.variables.map((variable, i) =>
                i === variableI ?
                    {...variable, ...update} :
                    variable
            )

            return props.updateEnvironment(props.environmentID, {
                ...env,
                variables: newVars
            })
        },
        onVariableAdd() {
            const env = props.environments[props.environmentID]
            const newVars = env.variables.concat([{
                identifier: "", value: ""
            }])

            return props.updateEnvironment(props.environmentID, {
                ...env,
                variables: newVars
            })
        },
        onVariableRemove(variableI) {
            const env = props.environments[props.environmentID]
            const newVars = env.variables.filter((v, varI) =>
                varI !== variableI
            )

            return props.updateEnvironment(props.environmentID, {
                ...env,
                variables: newVars
            })
        },
        onSave() {
            return props.saveEnvironment(props.environmentID)
        },
        ...props.environments[props.environmentID],
    })),
    lifecycle({
        componentDidMount() {
            this.props.fetchEnvironment(this.props.environmentID)
        }
    })
)

export default enhance(Environment)

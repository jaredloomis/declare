import React            from "react"
import {
    compose, withState, setDisplayName
} from "recompose"

import Button            from "./base/Button"
import EnvironmentSelect from "../containers/EnvironmentSelect"

const Product = props => {
    const change = key => value =>
        props.setChanges({
            ...props.changes,
            [key]: value
        })

    const save = () => props.onChange(props.changes)

    return <div>
        Default Environment:
        <EnvironmentSelect
            onChange={change("defaultEnvironment")}
            defaultValue={props.defaultEnvironment}/>
        <Button type="primary" onClick={save}>Save</Button>
    </div>
}

const enhance = compose(
    withState("changes", "setChanges", {}),
    setDisplayName("Product")
)

export default enhance(Product)

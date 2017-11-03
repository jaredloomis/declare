import React from "react"

import Button        from "./base/Button"
import Select        from "./base/Select"
import ElementSelect from "../containers/ElementSelect"

import bulma from "../../style/bulma"

const Action = ({actionType, values, onChange, onRemove}) => {
    const val    = values ? values.element : ""
    const change = value => {
        onChange({
            actionType,
            values: {element: value}
        })
    }
    return <div className={bulma.columns}>
        <div className={`${bulma.column} ${bulma.is_one_quarter}`}>
        <Select label="Action" onChange={() => {}} defaultValue="click">
            <span value="click">Click</span>
        </Select>
        </div>
        <div className={bulma.column}>
        <ElementSelect defaultValue={val} onChange={change}/>
        </div>
        <div className={bulma.column}>
        <Button inline={true} type="danger outlined" onClick={onRemove}>
            <i className="material-icons">delete</i>
        </Button>
        </div>
    </div>
}

Action.displayName = "Action"
export default Action

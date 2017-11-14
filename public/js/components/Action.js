import React from "react"
import {withState, compose, setDisplayName} from "recompose"

import Button        from "./base/Button"
import Select        from "./base/Select"
import ElementSelect from "../containers/ElementSelect"

import bulma from "../../style/bulma"

const Action = ({actionType, values, setActionType, setValues, onChange, onRemove}) => {
    const val       = values ? values.element : ""
    const tyChange  = ty => {
        setActionType(ty)
        onChange({
            actionType: ty,
            values
        })
    }
    const valChange = value => {
        setValues({element: value})
        onChange({
            actionType,
            values: {element: value}
        })
    }
    return <div className={bulma.columns}>
        <div className={`${bulma.column} ${bulma.is_one_quarter}`}>
        <Select label="Action" onChange={tyChange} defaultValue="click">
            <span value="click">Click</span>
        </Select>
        </div>
        <div className={bulma.column}>
        <ElementSelect defaultValue={val} onChange={valChange}/>
        </div>
        <div className={bulma.column}>
        <Button inline={true} type="danger outlined" onClick={onRemove}>
            <i className="material-icons">delete</i>
        </Button>
        </div>
    </div>
}

const enhance = compose(
    setDisplayName("Action"),
    withState("actionType", "setActionType", ({actionType}) => actionType),
    withState("values",     "setValues",     ({values})     => values)
)

export default enhance(Action)

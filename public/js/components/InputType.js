import React       from "react"
import {withState} from "recompose"

import TextInput from "./base/TextInput"
import Button    from "./base/Button"
import Select    from "./base/Select"

const InputTypeBase = props => {
    const {name, constraints, onConstraintChange, onConstraintAdd} = props
    const constraintElems = constraints && constraints.map((constraint, i) => {
        // Determine constraint type
        const constraintTy = props.constraintTypes[i] ||
            (constraint.regex                             ? "regex"  :
             constraint.minLength || constraint.maxLength ? "length" : undefined)

        // Render as inferred constraint
        if(constraintTy === "regex") {
            const change = event => onConstraintChange(i, {
                regex: event.target.value
            })

            return <div className="row">
                <TextInput label="Regex" onChange={change}
                           defaultValue={constraint.regex}/>
            </div>
        } else if(constraintTy === "length") {
            const change = key => event => onConstraintChange(i, {
                [key]: event.target.value
            })

            return <div className="row">
                Length:
                <TextInput label="Min Length" onChange={change("minLength")}
                           defaultValue={constraint.minLength}/>
                <TextInput label="Max Length" onChange={change("maxLength")}
                           defaultValue={constraint.maxLength}/>
            </div>
        }
    }).map((constraintDOM, i) => {
        // Add controls to each constraint row
        const constraint = constraints[i]
        const curSelectedConstraint =
            constraint.regex                             ? "regex"  :
            constraint.minLength || constraint.maxLength ? "length" : null
        const change = newVal => {
            props.setConstraintTypes(tys => ({
                ...tys,
                [i]: newVal
            }))
        }

        return <div key={i}>
            <Select label="Constraint Type" onChange={change}
                    defaultValue={curSelectedConstraint}>
                <span value="regex">Regex</span>
                <span value="length">Length</span>
            </Select>
            {constraintDOM}
        </div>
    })
    return <div className="card">
        <span>{name}</span>
        {constraintElems}
        <Button onClick={onConstraintAdd}>+</Button>
        <Button onClick={props.onSave}>Save</Button>
        <Button onClick={props.onDelete}>Delete</Button>
    </div>
}

const enhance = withState("constraintTypes", "setConstraintTypes", {})

const InputType = enhance(InputTypeBase)
InputType.displayName = "InputType"
export default InputType

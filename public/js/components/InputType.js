import React       from "react"
import {withState} from "recompose"

import TextInput from "./base/TextInput"
import Button    from "./base/Button"
import Select    from "./base/Select"
import Title     from "./base/Title"
import Group     from "./base/Group"

import bulma from "../../style/bulma.js"

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

            return <TextInput label="Regex" onChange={change}
                              defaultValue={constraint.regex}/>
        } else if(constraintTy === "length") {
            const change = key => event => onConstraintChange(i, {
                [key]: event.target.value
            })

            return [
                <TextInput label="Min Length" onChange={change("minLength")}
                           defaultValue={constraint.minLength} key={i}/>,
                <TextInput label="Max Length" onChange={change("maxLength")}
                           defaultValue={constraint.maxLength} key={i + 0.5}/>
            ]
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
            <Group>
                <Select label="Constraint" onChange={change}
                        defaultValue={curSelectedConstraint}>
                    <span value="regex">Regex</span>
                    <span value="length">Length</span>
                </Select>
                {constraintDOM}
            </Group>
        </div>
    })
    return <div>
        <Title size="5">{name}</Title>
        <div className={bulma.field}>
            {constraintElems}
        </div>
        <div className={bulma.field}>
            <Button onClick={onConstraintAdd} type="info">+ Add Constraint</Button>
        </div>
        <Group>
            <Button onClick={props.onSave} type="primary">Save</Button>
            <Button onClick={props.onDelete} type="danger outlined">Delete</Button>
        </Group>
    </div>
}

const enhance = withState("constraintTypes", "setConstraintTypes", {})

const InputType = enhance(InputTypeBase)
InputType.displayName = "InputType"
export default InputType

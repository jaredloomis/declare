import React       from "react"
import {compose, withState} from "recompose"

import Row       from "./base/Row"
import Column    from "./base/Column"
import TextInput from "./base/TextInput"
import Button    from "./base/Button"
import Select    from "./base/Select"
import Group     from "./base/Group"
import EditableHeading from "./base/EditableHeading"

import bulma from "../../style/bulma.js"

const Constraint = ({constraint, constraintType, onChange}) => {
    if(constraintType === "regex") {
        return <Column>
            <TextInput label="Regex" onChange={onChange("regex")}
                       defaultValue={constraint.regex}/>
        </Column>
    } else if(constraintType === "length") {
        return [
            <Column key="minLength">
                <TextInput label="Min Length" onChange={onChange("minLength")}
                           defaultValue={constraint.minLength} key="minLength"/>
            </Column>,
            <Column key="maxLength">
                <TextInput label="Max Length" onChange={onChange("maxLength")}
                           defaultValue={constraint.maxLength} key="maxLength"/>
            </Column>
        ]
    } else {
        return null
    }
}
Constraint.displayName = "Constraint"

const InputTypeBase = props => {
    // Extract/default vals
    const {
        name, constraints, onConstraintChange,
        onNameChange,
        onConstraintAdd, onConstraintRemove,
        constraintIDs, setConstraintIDs,
        constraintTypes, setConstraintTypes
    } = props

    // Event handlers
    const constraintAdd = () => {
        setConstraintIDs(constraintIDs.concat([Math.random()]))
        setConstraintTypes(constraintTypes.concat([null]))
        onConstraintAdd()
    }
    const constraintRemove = constraintI => {
        setConstraintIDs(constraintIDs.filter((constr, i) =>
            i !== constraintI
        ))
        setConstraintTypes(constraintTypes.filter((ty, i) =>
            i !== constraintI
        ))
        onConstraintRemove(constraintI)
    }
    const constraintChange = i => key => value => onConstraintChange(i, {
        [key]: value
    })
    const typeChange = i => newVal => {
        setConstraintTypes(constraintTypes.map((val, ci) => {
            if(ci === i) return newVal
            else         return val
        }))
    }

    // Render constraints
    const constraintElems = constraints && constraints.map((constraint, constraintI) => {
        const constraintID   = constraintIDs[constraintI]
        const constraintType = constraintTypes[constraintI]

        return <div key={constraintID}>
            <Group>
                <Select label="Constraint" onChange={typeChange(constraintI)}
                        defaultValue={constraintType}>
                    <span value="regex">Regex</span>
                    <span value="length">Length</span>
                </Select>
                <Row>
                    <Constraint constraint={constraint}
                                constraintType={constraintTypes[constraintI]}
                                onChange={constraintChange(constraintI)}/>
                </Row>
                <Button onClick={() => constraintRemove(constraintI)}
                        type="danger outlined" inline={true}>
                    Remove Constraint
                </Button>
            </Group>
        </div>
    })

    // Render outline
    return <div>
        <EditableHeading size="5" onChange={onNameChange}>{name}</EditableHeading>
        {/*<Heading size="5">{name}</Heading>*/}
        <div className={bulma.field}>
            {constraintElems}
        </div>
        <div className={bulma.field}>
            <Button onClick={constraintAdd} type="info">
                + Add Constraint
            </Button>
        </div>
        <Group>
            <Button onClick={props.onSave} type="primary">Save</Button>
            <Button onClick={props.onDelete} type="danger outlined">
                Delete
            </Button>
        </Group>
    </div>
}

const getConstraintType = constraint => {
    return (constraint.regex                             ? "regex"  :
            constraint.minLength || constraint.maxLength ? "length" : undefined)
}

const enhance = compose(
    withState("constraintTypes", "setConstraintTypes", ({constraints}) =>
        constraints ? constraints.map(getConstraintType)  : []
    ),
    withState("constraintIDs",   "setConstraintIDs",   ({constraints}) =>
        constraints ? constraints.map(x => Math.random()) : []
    )
)

const InputType = enhance(InputTypeBase)
InputType.displayName = "InputType"
export default InputType

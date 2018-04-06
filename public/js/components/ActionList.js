import React from "react"
import {withState, setDisplayName, compose, withPropsOnChange} from "recompose"

import Button     from "./base/Button"
import Action     from "./Action"
import generateID from "../lib/ID"

const ActionList = ({actions, actionKeys, setActionKeys, onAdd, onRemove, onChange, onInsert}) => {
    const add    = () => {
        onAdd()
        setActionKeys([...actionKeys, generateID()])
    }
    const remove = index => {
        onRemove(index)
        setActionKeys(actionKeys.filter((key, i) => i !== index))
    }
    const change = index => action => {
        onChange(index)(action)
    }
    const insert = index => {
        onInsert(index)

        const newActionKeys = []
        for(let i = 0; i < actionKeys.length; ++i) {
            if(i === index) {
                newActionKeys.push(generateID())
            }
            newActionKeys.push(actionKeys[i])
        }
        setActionKeys(newActionKeys)
    }

    return <div>
        {actions && actions.map((action, actionI) =>
            <div key={actionKeys[actionI] || actionI}>
                <Button type="small light" onClick={() => insert(actionI)}>Insert Step</Button>
                <Action {...action}
                    onChange={change(actionI)}
                    onRemove={() => remove(actionI)}/>
            </div>
        )}
        <Button onClick={add} type="info">+</Button>
    </div>
}

const enhance = compose(
    withState("actionKeys", "setActionKeys"),
    withPropsOnChange(["actions"], props => {
        if(props.actionKeys && props.actionKeys.length) {
            return {
                actionKeys: props.actionKeys
            }
        }
        return {
            actionKeys: props.actions && props.actions.map(action => generateID())
        }
    }),
    setDisplayName("ActionList")
)

export default enhance(ActionList)

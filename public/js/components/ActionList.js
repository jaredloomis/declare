import React from "react"
import {withState, setDisplayName, compose} from "recompose"

import Title  from "./base/Title"
import Button from "./base/Button"
import Action from "./Action"

const ActionList = ({actions, actionKeys, setActionKeys, onAdd, onRemove, onChange}) => {
    const add    = () => {
        onAdd()
        setActionKeys([...actionKeys, generateKey()])
    }
    const remove = index => {
        onRemove(index)
        setActionKeys(actionKeys.filter((key, i) => i !== index))
    }
    const change = index => action => {
        onChange(index)(action)
    }

    return <div>
        <Title size="4">{name}</Title>
        {actions && actions.map((action, actionI) =>
            <Action {...action}
                onChange={change(actionI)}
                onRemove={() => remove(actionI)}
                key={actionKeys[actionI]}/>
        )}
        <Button onClick={add} type="info">+</Button>
    </div>
}

const generateKey = Math.random

const enhance = compose(
    withState("actionKeys", "setActionKeys", ({actions}) =>
        actions ? actions.map(action => generateKey()) : []
    ),
    setDisplayName("ActionList")
)

export default enhance(ActionList)

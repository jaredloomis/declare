import React from "react"
import {withState, setDisplayName, compose, withProps} from "recompose"

import Button     from "./base/Button"
import Action     from "./Action"
import generateID from "../lib/ID"

import style from "../../style/ActionList.scss"

const ActionList = ({actions, productID, actionKeys, setActionKeys, onAdd, onRemove, onChange, onInsert}) => {
    const updateActionKeys = () => {
        if(actionKeys.length === actions.length)
            return null

        const newActionKeys = actionKeys
        while(newActionKeys.length < actions.length)
            newActionKeys.push(generateID())
        while(newActionKeys.length > actions.length)
            newActionKeys.push(generateID())
    }
    const add    = () => {
        onAdd()
        updateActionKeys()
        setActionKeys([...actionKeys, generateID()])
    }
    const remove = index => () => {
        onRemove(index)
        updateActionKeys()
        setActionKeys(actionKeys.filter((key, i) => i !== index))
    }
    const change = index => action => {
        updateActionKeys()
        onChange(index)(action)
    }
    const insert = index => {
        updateActionKeys()
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
            <div className={style.action} key={actionKeys[actionI] || actionI}>
                <Button type="small light" onClick={() => insert(actionI)}>Insert Step</Button>
                <Action {...action}
                    productID={productID}
                    onChange={change(actionI)}
                    onRemove={remove(actionI)}/>
            </div>
        )}
        <Button onClick={add} type="info">+</Button>
    </div>
}

const enhance = compose(
    withState("actionKeys", "setActionKeys", []),
    /*
    withProps(props => {
        if(props.actionKeys && props.actionKeys.length) {
            console.log("NUL")
            return {
                actionKeys: props.actionKeys
            }
        }
        return {
            actionKeys: props.actions ? props.actions.map(action => generateID()) : []
        }
    }),
    */
    setDisplayName("ActionList")
)

export default enhance(ActionList)

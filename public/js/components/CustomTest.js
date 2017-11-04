import React from "react"

import Action from "./Action"

const CustomTest = ({name, actions, onActionChange, onActionRemove, onActionAdd}) => {
    return <div>
        {name}
        {actions && actions.map((action, actionI) =>
            <Action {...action} onChange={onActionChange(actionI)} key={actionI}/>
        )}
    </div>
}

CustomTest.displayName = "CustomTest"
export default CustomTest

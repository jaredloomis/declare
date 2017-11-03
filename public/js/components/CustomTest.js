import React from "react"

import Action from "./Action"

const CustomTest = ({name, actions, onActionChange, onActionRemove, onActionAdd}) => {
    return <div>
        {actions.map(action => <Action {...action}/>)}
    </div>
}

CustomTest.displayName = "CustomTest"
export default CustomTest

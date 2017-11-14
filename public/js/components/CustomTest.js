import React from "react"
import {setDisplayName} from "recompose"

import Button        from "./base/Button"
import EditableTitle from "./base/EditableTitle"
import ActionList    from "./ActionList"

const CustomTest = props => {
    const {
        name, actions,
        onNameChange,
        onActionChange, onActionRemove, onActionAdd,
        onRemove
    } = props

    return <div>
        <EditableTitle size="4" onChange={onNameChange}>{name}</EditableTitle>
        <ActionList actions={actions}
            onAdd={onActionAdd}
            onChange={onActionChange}
            onRemove={onActionRemove}/>
        <Button type="danger outlined" onClick={onRemove}>Delete</Button>
    </div>
}

const enhance = setDisplayName("CustomTest")

export default enhance(CustomTest)

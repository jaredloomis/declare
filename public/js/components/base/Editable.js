import React from "react"
import {compose, withState, setDisplayName} from "recompose"

const enhance = compose(
    withState("isEditing", "setIsEditing", false),
    setDisplayName("Editable")
)

export default EditComponent => DisplayComponent => enhance(props => {
    const {setIsEditing, isEditing} = props

    const displayClicked = event => {
        setIsEditing(true)

        if(props.onClick) {
            props.onClick(event)
        }
    }
    const editComplete   = () => {
        setIsEditing(false)
    }

    if(!isEditing) {
        return <DisplayComponent {...props} onClick={displayClicked}>
            {props.children}
        </DisplayComponent>
    } else {
        return <EditComponent {...props} defaultValue={props.children} onBlur={editComplete}/>
    }
})

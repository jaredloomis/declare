import React from "react"
import {compose, withState, setDisplayName} from "recompose"

import FeatherIcon from "./FeatherIcon"

import style from "../../../style/Editable.scss"

const enhance = compose(
    withState("state", "setState", {
        isEditing: false
    }),
    setDisplayName("Editable")
)

export default (EditComponent, DisplayComponent) => enhance(props => {
    const {setState, state, ...passProps} = props

    const displayClicked = event => {
        setState({
            ...state,
            isEditing: true
        })

        if(props.onClick) {
            props.onClick(event)
        }
    }
    const editComplete = () => setState({
        ...state,
        isEditing: false
    })
    const mouseMove = event => {
        event.target.focus()
    }

    if(!state.isEditing) {
        return <div className={style.display} onClick={displayClicked}>
            <DisplayComponent {...passProps}>
                {props.children}
            </DisplayComponent>
            <span className={style.icon}>
                <FeatherIcon icon="edit-2" size={props.iconSize || 20}/>
            </span>
        </div>
    } else {
        return <EditComponent {...passProps}
            defaultValue={props.children}
            onMouseOver={mouseMove}
            onBlur={editComplete}/>
    }
})

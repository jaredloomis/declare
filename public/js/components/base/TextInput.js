import React from "react"

import {withState, setDisplayName, compose} from "recompose"

import bulma from "../../../style/bulma"
import style from "../../../style/TextInput.scss"

const TextInputBase = props => {
    // Extract props
    const {label, focused, setFocused, defaultValue, onChange,
           empty, setEmpty, onBlur} = props
    const randID = `${Math.random()}`

    // The label is active if input is focused, or there is text in input
    const labelActive = focused || !empty

    // onChange doesn't need whole event
    const change = event => {
        const val = event.target.value

        setEmpty(!(val && val.length))
        onChange(val)
    }
    // Keep track of whether element is focused (for label)
    const focus   = () => setFocused(true)
    const unfocus = event => {
        setFocused(false)
        // Bubble up to any event handlers on this component
        if(onBlur) {
            onBlur(event)
        }
    }

    const labelClick = () => {
        document.getElementById(randID).focus()
    }

    return <div className={style.textInput}>
        <label className={labelActive ? style.activeLabel : ""} onClick={labelClick}>
            {label}
        </label>
        <input type="text" className={bulma.input} defaultValue={defaultValue}
            onFocus={focus} onBlur={unfocus} onChange={change} id={randID}/>
    </div>
}

const enhance = compose(
    withState("focused", "setFocused", false),
    withState("empty", "setEmpty", ({defaultValue}) => !defaultValue),
    setDisplayName("TextInput")
)

export default enhance(TextInputBase)

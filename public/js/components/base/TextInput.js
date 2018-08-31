import React from "react"

import {
    withState, setDisplayName,
    lifecycle, compose, withHandlers,
    withProps
} from "recompose"

import bulma from "../../../style/bulma"
import style from "../../../style/TextInput2.scss"

const TextInputBase = props => {
    // Extract props
    const {label, focused, setFocused, defaultValue, onChange,
           text, setText, onBlur} = props

    // Create an ID for element
    const randID = `${Math.random()}`

    // The label is active if input is focused, or there is text in input
    const labelActive = focused || (text && text.length !== 0)

    // Define input change handling
    const change = event => {
        const val = event.target.value

        setText(val)
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

    // When user clicks on the label, focus should go
    // to the corresponding <input>
    const labelClick = () => {
        document.getElementById(randID).focus()
    }

    return <div className={style.textInput}>
        {/*<label className={labelActive ? style.activeLabel : ""} onClick={labelClick}>
            {label}
        </label>*/}
        <input type="text" className={/*bulma.input*/ null} defaultValue={defaultValue}
            onFocus={focus} onBlur={unfocus} onChange={change} id={randID}
            placeholder={label}/>
    </div>
}

const enhance = compose(
    withState("state", "setState", ({defaultValue}) => ({
        focused: false,
        text:    defaultValue || ""
    })),
    withProps(props => ({
        focused: props.state.focused,
        text:    props.state.text
    })),
    withHandlers({
        setFocused: ({setState}) => focused => setState(state => ({...state, focused})),
        setText:    ({setState}) => text    => setState(state => ({...state, text}))
    }),
    lifecycle({
        componentDidMount() {
            this.props.setText(this.props.defaultValue)
        }
    }),
    setDisplayName("TextInput")
)

export default enhance(TextInputBase)

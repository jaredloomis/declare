import React from "react"

const TextInput = ({label, defaultValue, onChange}) => {
    const randID = Math.floor(Math.random() * 10000)
    return <div className="field input-field">
        <input type="text" id={randID}
               defaultValue={defaultValue} onChange={onChange}/>
        <label htmlFor={randID}>{label}</label>
    </div>
}

TextInput.displayName = "TextInput"
export default TextInput

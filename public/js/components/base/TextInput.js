import React from "react"

const TextInput = ({label, defaultValue, onChange}) => {
    return <div className="field">
        <label className="label">{label}</label>
        <input type="text" className="input"
               defaultValue={defaultValue} onChange={onChange}/>
    </div>
}

TextInput.displayName = "TextInput"
export default TextInput

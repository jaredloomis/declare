import React from "react"

import bulma from "../../../style/bulma"

const TextInput = ({label, defaultValue, onChange}) => {
    return <input type="text" className={bulma.input} placeholder={label}
                  defaultValue={defaultValue} onChange={onChange}/>
    /*
    return <div className="field">
        <label className="label">{label}</label>
        <input type="text" className="input"
               defaultValue={defaultValue} onChange={onChange}/>
    </div>
    */
}

TextInput.displayName = "TextInput"
export default TextInput

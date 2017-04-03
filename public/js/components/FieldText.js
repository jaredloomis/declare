import React from "react"

const FieldText = ({name, uid, defaultValue, onChange}) => {
    const randID = Math.floor(Math.random() * 10000)
    return <div className="field input-field">
        <input type="text" id={randID}
               defaultValue={defaultValue} onChange={onChange(uid)}/>
        <label htmlFor={randID}>{name}</label>
    </div>
}

FieldText.displayName = "FieldText"
export default FieldText

import React from "react"

const FieldText = ({uid, name, onChange}) => {
    return <div className="field input-field">
        <input type="text" id={uid} onChange={onChange(uid)}/>
        <label htmlFor={name}>{name}</label>
    </div>
}

FieldText.displayName = "FieldText"
export default FieldText

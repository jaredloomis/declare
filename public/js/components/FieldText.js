import React, {Component} from "react"

const FieldText = ({name, onChange}) => {
    return <div className="field input-field">
        <input type="text" onChange={onChange}/>
        <label htmlFor={name}>{name}</label>
    </div>
}

FieldText.displayName = "FieldText"
export default FieldText

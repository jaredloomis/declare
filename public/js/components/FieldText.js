import React from "react"

const FieldText = ({name, onChange}) => {
    const randID = Math.floor(Math.random() * 10000)
    return <div className="field input-field">
        <input type="text" id={randID} onChange={onChange}/>
        <label htmlFor={randID}>{name}</label>
    </div>
}

FieldText.displayName = "FieldText"
export default FieldText

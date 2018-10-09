import React from "react"

import bulma from "../../../style/bulma"

const Textarea = ({children, onChange, defaultValue, value, ...props}) => {
    return <textarea
        className={bulma.textarea}
        defaultValue={children || defaultValue || value}
        onChange={event => onChange(event.target.value)}
        {...props}/>
}

Textarea.displayName = "Textarea"
export default Textarea

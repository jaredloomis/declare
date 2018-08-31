import React from "react"

import bulma from "../../../style/bulma"

const Checkbox = props => {
    const {
        children, checked, onChange
    } = props

    return <label className={bulma.checkbox}>
        <input type="checkbox" checked={checked} onChange={onChange}/>
        {children}
    </label>
}

Checkbox.displayName = "Checkbox"
export default Checkbox

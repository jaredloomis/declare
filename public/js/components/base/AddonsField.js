import React from "react"

import bulma from "../../../style/bulma"

/**
 * Renders a group of control elements as a single connected element
 */
const AddonsField = ({children}) => {
    const childArr = Array.isArray(children) ?
        [].concat.apply([], children) :
        [children]

    return <div className={`${bulma.field} ${bulma.has_addons}`}>
        {childArr.map((child, i) =>
            <div className={bulma.control} key={i}>{child}</div>
        )}
    </div>
}

AddonsField.displayName = "AddonsField"
export default AddonsField

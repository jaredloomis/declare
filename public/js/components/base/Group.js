import React from "react"

import bulma from "../../../style/bulma"

/**
 * Renders a group of control elements inline
 */
const Group = ({children}) => {
    const childArr = Array.isArray(children) ?
        [].concat.apply([], children) :
        [children]

    return <div className={`${bulma.field} ${bulma.is_grouped}`}>
        {childArr.map((child, i) =>
            <div className={bulma.control} key={i}>{child}</div>
        )}
    </div>
}

Group.displayName = "Group"
export default Group

import React from "react"

import bulma from "../../../style/bulma"

const Column = ({children, size}) =>
    <div className={`${bulma.column} ${size ? bulma[`is_${size}`] : ""}`}>
        {children}
    </div>

Column.displayName = "Column"
export default Column

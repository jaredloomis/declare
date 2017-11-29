import React from "react"

import bulma from "../../../style/bulma"

const Row = props => {
    const {marginless, children} = props
    const passProps = Object.assign({}, props, {marginless: undefined, children: undefined})
    return <div {...passProps} className={`${bulma.columns} ${marginless ? bulma.is_marginless : ""}`}>
        {children}
    </div>
}

Row.displayName = "Row"
export default Row

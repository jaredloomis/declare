import React from "react"

import bulma from "../../../style/bulma.js"

const Subtitle = ({children}) => {
    return <h3 className={bulma.subtitle}>
        {children}
    </h3>
}

Subtitle.displayName = "Subtitle"
export default Subtitle

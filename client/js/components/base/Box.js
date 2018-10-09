import React from "react"

import bulma from "../../../style/bulma"

const Box = ({children, ...props}) =>
    <div {...props} className={bulma.box}>
        {children}
    </div>

Box.displayName = "Box"
export default Box

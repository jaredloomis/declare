import React from "react"

import bulma from "../../../style/bulma"

const Container = ({children}) =>
    <div className={bulma.container}>
        {children}
    </div>

Container.displayName = "Container"
export default Container

import React from "react"

import bulma from "../../../style/bulma"

const Section = ({size, children}) => {
    const sizeClass = size && size.length ? bulma[`is_${size}`] : ""
    return <div className={`${bulma.section} ${sizeClass}`}>
        {children}
    </div>
}

Section.displayName = "Section"
export default Section

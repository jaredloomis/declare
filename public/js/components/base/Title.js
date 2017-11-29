import React from "react"

import bulma from "../../../style/bulma.js"

const Title = props => {
    const {children, primary=false} = props
    const size = primary ? 1 : (props.size || 5)
    // Parse boolean strings for primary prop
    const primaryBool =
        typeof(primary) === "string" ? primary === "true" : primary

    if(primaryBool)
        return <h1 onClick={props.onClick} className={bulma.title}>{children}</h1>
    else
        return <h3 onClick={props.onClick} className={`${bulma.title} ${bulma[`is_${size}`]} ${bulma.is_spaced}`}>
            {children}
        </h3>
}

Title.displayName = "Title"

export default Title

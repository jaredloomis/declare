import React from "react"

import bulma from "../../../style/bulma"

const Tag = ({children, type, ...props}) => {
    const klass = `${bulma.tag} ${typeToClasses(type)}}`

    return <span className={klass} {...props}>
        {children}
    </span>
}

/* Transform type prop to html className value */
function typeToClasses(type) {
    let ret = ""
    if(typeof(type) === "string") {
        type = type.split(" ")
    } else if(!type) {
        type = []
    }
    type.filter(ty => ty.length).forEach(ty => {
        ret += bulma[`is_${ty}`]
        ret += " "
    })
    return ret
}

Tag.displayName = "Tag"
export default Tag

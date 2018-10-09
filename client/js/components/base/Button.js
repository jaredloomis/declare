import React from "react"

import bulma from "../../../style/bulma"
import style from "../../../style/Button.scss"

const Button = ({onClick, children, color, type, inline, to}) => {
    const klass = `${bulma.button} ${typeToClasses(type)} ${typeToClasses(color)}`

    if(!onClick && to)
        onClick = () => window.location.href = to

    return <button onClick={onClick} className={klass}>
        {children}
    </button>
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

Button.displayName = "Button"
export default Button

import React from "react"

import bulma from "../../../style/bulma"

/**
 * Renders a floating point number with specified precision
 * (defaults to two decimal places)
 */
const FloatingPoint = ({number, children, precision=2}) => {
    let float = number || children
    if(typeof(float) === "string")
        float = parseFloat(float)

    if(typeof(float) === "number")
        return float.toFixed(precision)
    else
        return float || null
}

FloatingPoint.displayName = "FloatingPoint"
export default FloatingPoint

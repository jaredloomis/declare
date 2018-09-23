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

    return float.toFixed(precision)
}

FloatingPoint.displayName = "FloatingPoint"
export default FloatingPoint

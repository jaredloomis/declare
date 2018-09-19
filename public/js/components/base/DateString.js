//import React from "react"

/**
 * Renders a date
 */
const DateString = ({date}) => {
    return new Date(date).toLocaleString()
}

DateString.displayName = "DateString"
export default DateString

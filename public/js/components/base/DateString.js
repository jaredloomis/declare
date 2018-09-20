//import React from "react"

/**
 * Renders a date
 */
const DateString = ({date, children}) => {
    return new Date(date || children).toLocaleString()
}

DateString.displayName = "DateString"
export default DateString

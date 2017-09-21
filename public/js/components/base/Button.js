import React from "react"

const Button = ({onClick, children, color}) => {
    const klass = `button ${color || ""}`
    return <button onClick={onClick} className={klass}>
        {children}
    </button>
}

Button.displayName = "Button"

export default Button

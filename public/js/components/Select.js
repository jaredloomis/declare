import React from "react"

const Select = ({name, children, onChange}) => {
    const randID = `Select${Math.floor(Math.random() * 10000)}`
    const change = value => event => onChange(value)
    const childElements = children.map((child, childI) =>
        <li key={childI}>
            <a onClick={change(child.props.value)}>{child.props.children}</a>
        </li>
    )
    return <div>
        <a className="dropdown-button btn" href="#"
           data-activates={randID}>{name}</a>
        <ul id={randID} className="dropdown-content">
            {childElements}
        </ul>
    </div>
}

Select.displayName = "Select"
export default Select

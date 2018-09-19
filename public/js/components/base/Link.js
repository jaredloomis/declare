import React            from "react"
import {setDisplayName} from "recompose"

const Link = ({to, children, ...props}) =>
    <a href={to} {...props}>{children}</a>

const enhance = setDisplayName("Link")
export default enhance(Link)

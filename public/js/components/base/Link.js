import React            from "react"
import {setDisplayName} from "recompose"

const Link = ({to, children}) => <a href={to}>{children}</a>

const enhance = setDisplayName("Link")

export default enhance(Link)

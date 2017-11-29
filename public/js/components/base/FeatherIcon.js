import React   from "react"
import feather from "feather-icons"

const FeatherIcon = props =>
    <span dangerouslySetInnerHTML={{__html: feather.toSvg(props.icon, props)}}>
    </span>

FeatherIcon.displayName = "FeatherIcon"
export default FeatherIcon

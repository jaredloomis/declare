import React   from "react"
import feather from "feather-icons"

const FeatherIcon = props => {
    const width  = props.width  || props.size || 24
    const height = props.height || props.size || 24

    const computedProps = {
        ...props,
        width, height
    }

    return <span dangerouslySetInnerHTML={{__html: feather.icons[props.icon].toSvg(computedProps)/*feather.toSvg(props.icon, computedProps)*/}} {...computedProps}>
    </span>
}

FeatherIcon.displayName = "FeatherIcon"
export default FeatherIcon

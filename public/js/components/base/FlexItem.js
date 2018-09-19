import React from "react"

const FlexItem = ({children, grow, shrink}) => {
    const style = {
        flexGrow:   grow || 1,
        flexShrink: shrink || 1,
        flexBasis: 0
    }

    return <div style={style}>
        {children}
    </div>
}

FlexItem.displayName = "FlexItem"
export default FlexItem

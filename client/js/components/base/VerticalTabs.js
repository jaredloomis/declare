import React from "react"

import Row    from "./Row"
import Column from "./Column"
import List   from "./List"

/**
 * Props:
 * - tabs     : [String | Component]
 *   List of tabs to render in a list
 * - children : Component
 *   What to render in main view
 */
const VerticalTabs = ({tabs, onTabSelect, children, ...props}) => {
    return <Row>
        <Column size="2">
            <List selectable onSelect={onTabSelect} {...props}>{tabs}</List>
        </Column>
        <Column>
            {children}
        </Column>
    </Row>
}

VerticalTabs.displayName = "VerticalTabs"

export default VerticalTabs

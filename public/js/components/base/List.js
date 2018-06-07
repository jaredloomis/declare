import React from "react"

import Row    from "./Row"
import Column from "./Column"

const List = props => {
    const {
        children,
        selectable=false, onSelect
    } = props

    return children.map((item, itemI) => {
        const selectableItem =
            selectable ? <a onClick={() => onSelect(itemI)}>{item}</a> :
                         item

        return <Row>
            <Column>{selectableItem}</Column>
        </Row>
    })
}

List.displayName = "List"

export default List

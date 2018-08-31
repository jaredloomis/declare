import React from "react"
import {
    setDisplayName, compose
} from "recompose"

import Row    from "./Row"
import Column from "./Column"

const chunks = (arr, size) => {
    const ret = []
    while(arr.length) {
        ret.push(arr.splice(0, size))
    }
    return ret
}

/**
 * @prop width    {Int}         number of columns per row
 * @prop children {[Component]} the individual cells to render
 * @prop flex     {Boolean}     if true, cells will expand to fill rows
 *                              when fewer than `width` children exist
 */
const FlexGrid = props => {
    const {children, width, flex} = props
    const columnSize = flex ? null : 12 / width

    return chunks(children, width).map((row, rowI) =>
        <Row key={rowI}>
            {row.map((item, itemI) =>
                <Column key={itemI} size={columnSize}>{item}</Column>
            )}
        </Row>
    )
}

const enhance = compose(
    setDisplayName("FlexGrid")
)

export default enhance(FlexGrid)

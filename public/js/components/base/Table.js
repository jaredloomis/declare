import React from "react"

import Row      from "./Row"
import Column   from "./Column"
import Flexbox  from "./Flexbox"
import FlexItem from "./FlexItem"

import style from "../../../style/Table.scss"

const Table = ({header, children, data}) => {
    return <div>
        <div className={style.header}>
        <Flexbox>
            {header.map((title, i) => 
                <FlexItem key={i}>{title}</FlexItem>
            )}
        </Flexbox>
        </div>
        {(children || data).map((dataRow, i) =>
            <div className={style.row} key={i}>
            <Flexbox>
                {dataRow.map((datum, j) =>
                    <FlexItem key={j}>{datum}</FlexItem>
                )}
            </Flexbox>
            </div>
        )}
    </div>
}

Table.displayName = "Table"
export default Table

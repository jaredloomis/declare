import React from "react"
import {withState, setDisplayName, compose} from "recompose"

import TextInput from "./TextInput"

import style from "../../../style/List.scss"

const List = props => {
    const {
        children,
        selectable=false, search=false, activeItem,
        onSelect=(() => {}),
        filter, setFilter
    } = props

    const searchBar = search && <div className={style.search}>
        <TextInput label="Filter"
            onChange={text => setFilter(text.toLowerCase())}/>
    </div>

    const items = (() => {
        if(filter) {
            return children.filter(child =>
                typeof(child) !== "string" ||
                child.toLowerCase().indexOf(filter) !== -1
            )
        } else {
            return children
        }
    })()

    return <div className={style.wrapper}>
        {searchBar}
        <div className={style.list}>
            {items.map((item, itemI) => {
                const itemStyle = `${style.item} ${itemI === activeItem ? style.active : ""}
                                   ${selectable ? style.selectable : ""}`
                const selectableItem = <span className={itemStyle} onClick={() => onSelect(itemI)}>
                    {item}
                </span>

                return <div className={style.itemWrapper} key={item && item.key || itemI}>
                    {selectableItem}
                </div>
            })}
        </div>
    </div>
}

const enhance = compose(
    withState("filter", "setFilter", null),
    setDisplayName("List")
)

export default enhance(List)

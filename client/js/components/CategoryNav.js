import React            from "react"
import {
    setDisplayName, withState, compose, defaultProps, withProps
} from "recompose"

import Flexbox   from "./base/Flexbox"

import style from "../../style/CategoryNav.scss"

const CategoryNav = ({onSelectionChange, categories, items, topLevel, itemRef, selection, setSelection}) => {
    const selectionsDOM = <div className={style.selectionsColumn}>{topLevel.map(id => {
        const active = selection[0] === id
        const click  = () => {
            const newSelection = [id]
            if(setSelection) setSelection(newSelection)
            onSelectionChange(newSelection)
        }

        const name = categories[id] ?
            categories[id].name :
            items && items[itemRef] && items[itemRef][id] && items[itemRef][id].name

        return <CategoryNavNode
            name={name}
            active={active}
            onClick={click}
            key={id}/>
    })}</div>

    const selectedCategory = categories[selection[0]]
    const setSubSelection  = subSelection => {
        const newSelection = [selection[0], ...subSelection]
        setSelection(newSelection)
        onSelectionChange(newSelection)
    }

    const childrenDOM = selectedCategory &&
        <CategoryNav
            topLevel={[...selectedCategory.children, ...selectedCategory.items]}
            categories={categories}
            items={items}
            itemRef={selectedCategory.itemRef}
            selection={selection.slice(1)}
            setSelection={setSubSelection}
            onSelectionChange={setSubSelection}/>

    // Hard-coded category temporarily
    return <Flexbox>
        {selectionsDOM}
        {childrenDOM}
    </Flexbox>
}

const CategoryNavNode = ({name, active, onClick}) => {
    const classes = `${style.selectionItem} ${active ? style.active : ""}`

    return <div className={classes} onClick={onClick}>
        {name}
    </div>
}

const enhance = compose(
    withProps(({categories}) => {
        const topLevel = Object.keys(categories)
            .filter(catID => !categories[catID].parent)

        return {
            topLevel,
            itemRef: topLevel[0] && topLevel[0].itemRef
        }
    }),
    withState("selection", "setSelection", []),
    setDisplayName("CategoryNav")
)

export default enhance(CategoryNav)

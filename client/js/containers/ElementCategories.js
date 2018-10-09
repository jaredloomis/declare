import React from "react"
import {
    setDisplayName, compose, lifecycle
} from "recompose"

import Box               from "../components/base/Box"
import Category          from "./Category"
import CategoryAdd       from "./CategoryAdd"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

import {listElements}    from "../actions/Element"
import {listCategories}  from "../actions/Category"

const ElementCategoriesBase = ({categories}) => {
    const categoryID = categories && Object.keys(categories).filter(catID => {
        const cat = categories[catID]
        return cat && !cat.parent && cat.itemRef.toLowerCase() === "element"
    })[0]

    if(categoryID) {
        return <Box>
            <Category categoryID={categoryID}/>
        </Box>
    } else {
        return <CategoryAdd itemRef="element"/>
    }
}

const enhance = compose(
    withReduxDispatch({
        listElements,
        listCategories
    }),
    withReduxState(["categories"]),
    lifecycle({
        componentDidMount() {
            this.props.listElements()
            this.props.listCategories()
        }
    }),
    setDisplayName("ElementCategories")
)
export default enhance(ElementCategoriesBase)

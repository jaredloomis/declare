import React from "react"
import {
    setDisplayName, compose, lifecycle
} from "recompose"

import Box               from "../components/base/Box"
import Category          from "./Category"
import CategoryAdd       from "./CategoryAdd"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

import {listPages}       from "../actions/Page"
import {listCategories}  from "../actions/Category"

const PageCategoriesBase = ({categories}) => {
    const categoryID = categories && Object.keys(categories).filter(catID => {
        const cat = categories[catID]
        return cat && !cat.parent && cat.itemRef.toLowerCase() === "page"
    })[0]

    if(categoryID) {
        return <Box>
            <Category categoryID={categoryID}/>
        </Box>
    } else {
        return <CategoryAdd itemRef="page"/>
    }
}

const enhance = compose(
    withReduxDispatch({
        listPages, listCategories
    }),
    withReduxState(["categories"]),
    lifecycle({
        componentDidMount() {
            this.props.listCategories()
            this.props.listPages()
        }
    }),
    setDisplayName("PageCategories")
)
export default enhance(PageCategoriesBase)

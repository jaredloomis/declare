import React from "react"
import {
    setDisplayName, compose, lifecycle
} from "recompose"

import Box               from "../components/base/Box"
import Category          from "./Category"
import CategoryAdd       from "./CategoryAdd"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

import {listInputTypes}  from "../actions/InputType"
import {listCategories}  from "../actions/Category"

const InputTypeCategoriesBase = ({categories}) => {
    const categoryID = categories && Object.keys(categories).filter(catID => {
        const cat = categories[catID]
        return cat && !cat.parent && cat.itemRef.toLowerCase() === "inputtype"
    })[0]

    if(categoryID) {
        // Hard-coded category temporarily
        return <Box>
            <Category categoryID={categoryID}/>
        </Box>
    } else {
        return <CategoryAdd itemRef="inputType"/>
    }
}

const enhance = compose(
    withReduxDispatch({
        listInputTypes,
        listCategories
    }),
    withReduxState(["categories"]),
    lifecycle({
        componentDidMount() {
            this.props.listInputTypes()
            this.props.listCategories()
        }
    }),
    setDisplayName("InputTypeCategories")
)
export default enhance(InputTypeCategoriesBase)

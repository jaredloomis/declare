import React from "react"
import {
    compose, setDisplayName
} from "recompose"

import withReduxDispatch from "./WithReduxDispatch"

import CategoryCreateComponent from "../components/CategoryCreate"
import {createCategory}        from "../actions/Category"

const CategoryAddBase = props => {
    const create = name => {
        props.createCategory({
            parent: props.parent,
            name,
            items: [],
            itemRef: props.itemRef
        })
        .then(props.onCreate || (() => {}))
    }

    return <CategoryCreateComponent onCreate={create}/>
}

const enhance = compose(
    withReduxDispatch({
        createCategory: {
            parameterized: createCategory
        }
    }),
    setDisplayName("CategoryAdd")
)

export default enhance(CategoryAddBase)

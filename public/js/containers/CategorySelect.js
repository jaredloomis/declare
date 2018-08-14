import React from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {
    listCategories
} from "../actions/Category"
import Select            from "../components/base/Select"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const CategorySelectBase = props => {
    const children = !props.categories ? [] :
        Object.keys(props.categories)
            .filter(catID =>
                props.categories[catID] &&
                props.categories[catID].itemRef === props.itemRef
            )
            .map(catID =>
                <span value={catID} key={catID}>
                    {props.categories[catID].name}
                </span>
            )

    return <Select label={props.label || "Category"} onChange={props.onChange} {...props}>
        {children}
    </Select>
}

const enhance = compose(
    withReduxDispatch({
        listCategories
    }),
    lifecycle({
        componentDidMount() {
            this.props.listCategories()
        }
    }),
    withReduxState(["categories"]),
    setDisplayName("CategorySelect")
)

export default enhance(CategorySelectBase)

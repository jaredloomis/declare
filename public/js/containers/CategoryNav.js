import {
    compose, lifecycle, withProps, setDisplayName, withState
} from "recompose"

import {listCategories}  from "../actions/Category"
import {listPages}       from "../actions/Page"
import {listElements}    from "../actions/Element"
import {listInputTypes}  from "../actions/InputType"

import CategoryNav       from "../components/CategoryNav"

import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const enhance = compose(
    withReduxState(["categories", "elements", "pages", "inputTypes"]),
    withReduxDispatch({
        listCategories,
        listInputTypes,
        listElements,
        listPages
    }),
    withState("fetched", "setFetched", []),
    withProps(props => {
        const {categories, onSelectionChange, fetched, setFetched} = props
        return {
            items: {
                page: props.pages,
                element: props.elements,
                inputType: props.inputTypes
            },
            onSelectionChange(selection) {
                const last             = selection[selection.length-1]
                const selectedCategory = categories[last]
                const itemRef = selectedCategory && selectedCategory.itemRef.toLowerCase()

                // Fetch items that will be displayed
                if(itemRef === "page" && fetched.indexOf("page") === -1) {
                    props.listPages()
                    setFetched([...fetched, "page"])
                } else if(itemRef === "inputtype" && fetched.indexOf("inputtype") === -1) {
                    props.listInputTypes()
                    setFetched([...fetched, "inputtype"])
                } else if(itemRef === "element" && fetched.indexOf("element") === -1) {
                    props.listElements()
                    setFetched([...fetched, "element"])
                }

                onSelectionChange(selection)
            }
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.listCategories()
        }
    }),
    setDisplayName("CategoryNavContainer")
)

export default enhance(CategoryNav)

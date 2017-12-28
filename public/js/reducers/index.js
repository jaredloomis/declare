//import {combineReducers} from "redux"

import pages       from "./Page"
import inputTypes  from "./InputType"
import elements    from "./Element"
import customTests from "./CustomTest"
import categories  from "./Category"

export default (state, event) =>
    categories(customTests(elements(inputTypes(pages(state, event), event), event), event), event)

/*
export default combineReducers({
    inputTypes, pages
})
*/

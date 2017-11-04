//import {combineReducers} from "redux"

import pages       from "./Page"
import inputTypes  from "./InputType"
import elements    from "./Element"
import customTests from "./CustomTest"

export default (state, event) =>
    customTests(elements(inputTypes(pages(state, event), event), event), event)

/*
export default combineReducers({
    inputTypes, pages
})
*/

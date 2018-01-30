//import {combineReducers} from "redux"

import pages       from "./Page"
import inputTypes  from "./InputType"
import elements    from "./Element"
import customTests from "./CustomTest"
import categories  from "./Category"
import users       from "./User"

export default (state, event) =>
    users(categories(customTests(elements(inputTypes(pages(state, event), event), event), event), event), event)

/*
export default combineReducers({
    inputTypes, pages
})
*/

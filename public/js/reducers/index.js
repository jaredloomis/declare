//import {combineReducers} from "redux"

import pages       from "./Page"
import inputTypes  from "./InputType"
import elements    from "./Element"
import customTests from "./CustomTest"
import categories  from "./Category"
import users       from "./User"
import errors      from "./Error"

export default (state, event) =>
    errors(users(categories(customTests(elements(inputTypes(pages(state, event), event), event), event), event), event), event)

/*
export default combineReducers({
    inputTypes, pages
})
*/

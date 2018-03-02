//import {combineReducers} from "redux"

import pages       from "./Page"
import inputTypes  from "./InputType"
import elements    from "./Element"
import customTests from "./CustomTest"
import categories  from "./Category"
import users       from "./User"
import errors      from "./Error"
import accounts    from "./Account"

export default (state, event) =>
    accounts(errors(users(categories(customTests(elements(inputTypes(pages(state, event), event), event), event), event), event), event), event)

/*
export default combineReducers({
    inputTypes, pages
})
*/

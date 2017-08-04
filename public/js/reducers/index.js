//import {combineReducers} from "redux"

import pages      from "./Page"
import inputTypes from "./InputType"

export default (state, event) => inputTypes(pages(state, event), event)

/*
export default combineReducers({
    inputTypes, pages
})
*/

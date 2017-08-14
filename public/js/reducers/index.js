//import {combineReducers} from "redux"

import pages      from "./Page"
import inputTypes from "./InputType"
import elements   from "./Element"

export default (state, event) => elements(inputTypes(pages(state, event), event), event)

/*
export default combineReducers({
    inputTypes, pages
})
*/

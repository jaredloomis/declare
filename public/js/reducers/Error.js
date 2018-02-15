// @flow
import {
    ERROR_DISPLAY_MSG, ERROR_ACKNOWLEDGE
} from "../actions/Types"

export default (state: any, action: any) => {
    if(action.type === ERROR_DISPLAY_MSG) {
        return {
            ...state,
            error: action.message
        }
    } else if(action.type === ERROR_ACKNOWLEDGE) {
        return {
            ...state,
            error: null
        }
    } else {
        return state
    }
}

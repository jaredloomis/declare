import {
    ERROR_DISPLAY_MSG, ERROR_ACKNOWLEDGE
} from "./Types"
import {ErrorType} from "../../../common/Error"

export const displayErrorMsg = message => ({
    type: ERROR_DISPLAY_MSG,
    message
})

export const acknowledgeError = {
    type: ERROR_ACKNOWLEDGE
}

export const handleError = (error, msg) => dispatch => {
    if(!error) return null

    if(error.type === ErrorType.NotLoggedIn) {
        window.location.hash = "/SignIn"
    } else {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `${msg ? msg + " " : ""}${error.message}`
        })
    }
}

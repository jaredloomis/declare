import {
    ERROR_DISPLAY_MSG, ERROR_ACKNOWLEDGE
} from "./Types"

export const displayErrorMsg = message => ({
    type: ERROR_DISPLAY_MSG,
    message
})

export const acknowledgeError = {
    type: ERROR_ACKNOWLEDGE
}

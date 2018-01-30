// @flow
import {
    USER_TOKEN_CREATE
} from "../actions/Types"

export default (state: any, action: any) => {
    if(action.type === USER_TOKEN_CREATE) {
        return {
            ...state,
            tokens: {
                ...state.tokens,
                [action.token._id]: action.token
            },
            activeToken: action.token.token
        }
    } else {
        return state
    }
}

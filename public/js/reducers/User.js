// @flow
import {
    USER_TOKEN_CREATE, USER_CREATE
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
    } else if(action.type === USER_CREATE) {
        return {
            ...state,
            users: {
                ...state.users,
                [action.user._id]: action.user
            }
        }
    } else {
        return state
    }
}

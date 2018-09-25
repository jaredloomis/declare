// @flow
import {
    USER_TOKEN_CREATE, USER_CREATE, USER_SET_FOCUS_PRODUCT,
    USER_LIST, USER_FETCH, USER_SET_ACTIVE
} from "../actions/Types"

export default (state: any, action: any) => {
    if(action.type === USER_TOKEN_CREATE) {
        return {
            ...state,
            tokens: {
                ...state.tokens,
                [action.token._id]: action.token
            },
            activeToken: action.token.token,
            activeUserID: action.token.user
        }
    } else if(action.type === USER_SET_ACTIVE) {
        return {
            ...state,
            activeUserID: action.userID
        }
    } else if(action.type === USER_CREATE) {
        return {
            ...state,
            users: {
                ...state.users,
                [action.user._id]: action.user
            }
        }
    } else if(action.type === USER_SET_FOCUS_PRODUCT) {
        const newUser = {
            ...state.users[state.activeToken.user],
            focusProduct: action.productID
        }

        return {
            ...state,
            users: {
                ...state.users,
                [state.activeToken.user]: newUser
            }
        }
    } else if(action.type === USER_LIST) {
        const newUsers = action.users.reduce((st, user) => {
            return {
                ...st,
                [user._id]: user
            }
        }, state)

        return {
            ...state,
            users: newUsers
        }
    } else if(action.type === USER_FETCH) {
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

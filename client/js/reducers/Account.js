// @flow
import {
    ACCOUNT_CREATE
} from "../actions/Types"

export default (state: any, action: any) => {
    if(action.type === ACCOUNT_CREATE) {
        return {
            ...state,
            accounts: {
                ...state.accounts,
                [action.account._id]: action.account
            }
        }
    } else {
        return state
    }
}

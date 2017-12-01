// @flow
import {
    CATEGORY_FETCH, CATEGORY_CREATE, CATEGORY_SAVE
} from "../actions/Types"

export default (state: any, action: any) => {
    if(action.type === CATEGORY_FETCH) {
        return {
            ...state,
            categories: {
                ...state.categories,
                [action.categoryID]: action.category
            }
        }
    } else if(action.type === CATEGORY_CREATE) {
        return {
            ...state,
            categories: {
                ...state.categories,
                [action.categoryID]: action.category
            }
        }
    } else if(action.type === CATEGORY_SAVE) {
        return state
    } else {
        return state
    }
}

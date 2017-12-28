// @flow
import {
    CATEGORY_FETCH, CATEGORY_CREATE, CATEGORY_SAVE,
    CATEGORY_ADD_ITEM, CATEGORY_UPDATE_ITEM, CATEGORY_UPDATE_NAME,
    CATEGORY_REMOVE_ITEM, CATEGORY_REMOVE
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
        const {_id, parent} = action.category
        const curParent     = state.categories[parent]
        const newParent     = {
            ...curParent,
            children: curParent.children.concat([_id])
        }
        return {
            ...state,
            categories: {
                ...state.categories,
                [_id]: action.category,
                [parent]: newParent
            }
        }
    } else if(action.type === CATEGORY_SAVE) {
        return state
    } else if(action.type === CATEGORY_ADD_ITEM) {
        const {categoryID, item} = action
        const curCategory = state.categories[categoryID]
        const newCategory = {
            ...curCategory,
            items: curCategory.items.concat([item])
        }
        return {
            ...state,
            categories: {
                ...state.categories,
                [categoryID]: newCategory
            }
        }
    } else if(action.type === CATEGORY_UPDATE_ITEM) {
        const {categoryID, itemI, item} = action
        const curCategory = state.categories[categoryID]
        const newCategory = {
            ...curCategory,
            items: curCategory.items.map((it, i) =>
                i === itemI ? item : it
            )
        }
        return {
            ...state,
            categories: {
                ...state.categories,
                [categoryID]: newCategory
            }
        }
    } else if(action.type === CATEGORY_REMOVE_ITEM) {
        const {categoryID, itemI} = action
        const curCategory = state.categories[categoryID]
        const newCategory = {
            ...curCategory,
            items: curCategory.items.filter((it, i) =>
                i !== itemI
            )
        }
        return {
            ...state,
            categories: {
                ...state.categories,
                [categoryID]: newCategory
            }
        }
    } else if(action.type === CATEGORY_UPDATE_NAME) {
        const {categoryID, name} = action
        const curCategory = state.categories[categoryID]
        const newCategory = {
            ...curCategory,
            name
        }
        return {
            ...state,
            categories: {
                ...state.categories,
                [categoryID]: newCategory
            }
        }
    } else if(action.type === CATEGORY_REMOVE) {
        const {categoryID} = action
        const curCategory  = state.categories[categoryID]
        const parentID     = curCategory.parent
        const curParent    = parentID && state.categories[parentID]
        const newParent    = {
            ...curParent,
            children: curParent.children.filter(id =>
                id.toString() !== categoryID.toString()
            )
        }
        return {
            ...state,
            categories: {
                ...state.categories,
                [categoryID]: null,
                [parentID]: newParent
            }
        }
    } else {
        return state
    }
}

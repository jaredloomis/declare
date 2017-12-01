// @flow
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    CATEGORY_FETCH, CATEGORY_CREATE, CATEGORY_SAVE
} from "./Types"

export const fetchCategory = (categoryID: string) => async (dispatch: Func) => {
    const {category} = await client.query(`query ($id: ID!) {
        category(id: $id) {
            _id
            parent
            items
            itemRef
            children
        }
    }`, {id: categoryID})

    dispatch({
        type: CATEGORY_FETCH,
        categoryID, category
    })
}

export const createCategory = (categoryInput: any) => async (dispatch: Func) => {
    const {category} = await client.mutate(`($category: CategoryInput) {
        category: createCategory(category: $category) {
            _id
            parent
            items
            itemRef
            children
        }
    }`, {category: categoryInput})
    dispatch({
        type: CATEGORY_CREATE,
        category
    })
}

export const saveCategory = (categoryID: string) => async (dispatch: Func, getState: Func) => {
    const cachedCategory = getState().categories[categoryID]
    delete cachedCategory._id
    delete cachedCategory.children
    const {category} = await client.mutate(`($categoryID: ID!, $category: CategoryInput) {
        category: updateCategory(id: $categoryID, category: $category) {
            _id
            parent
            items
            itemRef
            children
        }
    }`, {
        categoryID,
        category: cachedCategory
    })

    dispatch({
        type: CATEGORY_SAVE,
        categoryID,
        category
    })
}

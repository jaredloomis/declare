// @flow
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    CATEGORY_FETCH, CATEGORY_CREATE, CATEGORY_SAVE,
    CATEGORY_ADD_ITEM, CATEGORY_UPDATE_ITEM, CATEGORY_REMOVE_ITEM,
    CATEGORY_UPDATE_NAME, CATEGORY_REMOVE
} from "./Types"

export const fetchCategory = (categoryID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const {category} = await client(token).query(`query ($id: ID!) {
        category(id: $id) {
            _id
            name
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

export const createCategory = (categoryInput: any) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const {category} = await client(token).mutate(`($category: CategoryInput!) {
        category: createCategory(category: $category) {
            _id
            name
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
    const token = getState().activeToken
    const cachedCategory = {
        ...getState().categories[categoryID]
    }
    delete cachedCategory._id
    delete cachedCategory.children
    const {category} = await client(token).mutate(`($categoryID: ID!, $category: CategoryInput!) {
        category: updateCategory(id: $categoryID, category: $category) {
            _id
            name
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

export const removeCategory = (categoryID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const {category} = await client(token).mutate(`($categoryID: ID!) {
        category: removeCategory(id: $categoryID) {
            _id
            name
            parent
            items
            itemRef
            children
        }
    }`, {
        categoryID
    })
    dispatch({
        type: CATEGORY_REMOVE,
        categoryID
    })
}

export const addItemToCategory = (categoryID: string, item: any) => ({
    type: CATEGORY_ADD_ITEM,
    categoryID, item
})

export const updateCategoryItem = (categoryID: string, itemI: number, item: any) => ({
    type: CATEGORY_UPDATE_ITEM,
    categoryID, itemI, item
})

export const removeCategoryItem = (categoryID, itemI: number) => ({
    type: CATEGORY_REMOVE_ITEM,
    categoryID, itemI
})

export const updateCategoryName = (categoryID: string, name: string) => ({
    type: CATEGORY_UPDATE_NAME,
    categoryID, name
})

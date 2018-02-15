// @flow
import gql from "graphql-tag"
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    CATEGORY_FETCH, CATEGORY_CREATE, CATEGORY_SAVE,
    CATEGORY_ADD_ITEM, CATEGORY_UPDATE_ITEM, CATEGORY_REMOVE_ITEM,
    CATEGORY_UPDATE_NAME, CATEGORY_REMOVE, ERROR_DISPLAY_MSG
} from "./Types"

import Fragments from "../graphQL/Fragments"

const fragments = Fragments.category

export const fetchCategory = (categoryID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const categoryRes = await client(token).query({
        query: gql`
            query ($id: ID!) {
                category(id: $id) {
                    ...FullCategory
                }
            }
        
            ${fragments.full}`,
        variables: {id: categoryID}
    })
    const res      = categoryRes.data.category
    const category = res.data
    const error    = res.error

    if(category) {
        dispatch({
            type: CATEGORY_FETCH,
            categoryID, category
        })
    } else {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't fetch category ${categoryID}. ${error}`
        })
    }
}

export const createCategory = (categoryInput: any) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const categoryRes = await client(token).mutate({
        mutation: `($category: CategoryInput!) {
            category: createCategory(category: $category) {
                ...FullCategory
            }

            ${fragments.full}
        }`,
        variables: {category: categoryInput}
    })
    const {data, error} = categoryRes.data.category
    const category = data

    dispatch({
        type: CATEGORY_CREATE,
        category
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't create category. ${error}`
        })
    }
}

export const saveCategory = (categoryID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const cachedCategory = {
        ...getState().categories[categoryID]
    }
    delete cachedCategory._id
    delete cachedCategory.children
    const categoryRes = await client(token).mutate({
        mutation: gql`($categoryID: ID!, $category: CategoryInput!) {
                category: updateCategory(id: $categoryID, category: $category) {
                    _id
                    name
                    parent
                    items
                    itemRef
                    children
                }
            }`,
        variables: {
            categoryID,
            category: cachedCategory
        }
    })
    const {data, error} = categoryRes.data.category
    const category = data

    dispatch({
        type: CATEGORY_SAVE,
        categoryID,
        category
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't create category. ${error}`
        })
    }
}

export const removeCategory = (categoryID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    await client(token).mutate({
        mutation: gql`($categoryID: ID!) {
                category: removeCategory(id: $categoryID) {
                    _id
                    name
                    parent
                    items
                    itemRef
                    children
                }
            }`,
        variables: {categoryID}
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

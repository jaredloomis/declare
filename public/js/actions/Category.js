// @flow
import gql from "graphql-tag"
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {cacheExpired} from "../constants/cache"
import {
    CATEGORY_FETCH, CATEGORY_CREATE, CATEGORY_SAVE,
    CATEGORY_ADD_ITEM, CATEGORY_UPDATE_ITEM, CATEGORY_REMOVE_ITEM,
    CATEGORY_UPDATE_NAME, CATEGORY_REMOVE, ERROR_DISPLAY_MSG,
    CATEGORY_LIST, CATEGORY_SET_ROOT
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

export const listCategories = async (dispatch: Func, getState: Func) => {
    const state = getState()

    // Check if we should just use cache
    if(!cacheExpired(state.meta.categories.lastList))
        return state.elements

    const token = state.activeToken
    const categoriesRes = await client(token).query({
        query: gql`
            query {
                categories {
                    ...MinimalCategoryList
                }
            }
        
            ${fragments.minimalList}`
    })
    const res        = categoriesRes.data.categories
    const categories = res.data
    const error      = res.error

    if(categories) {
        dispatch({
            type: CATEGORY_LIST,
            categories
        })
    } else {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't list categories. ${error}`
        })
    }
}

export const createCategory = (categoryInput: any) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const categoryRes = await client(token).mutate({
        mutation: gql`
            mutation ($category: CategoryInput!) {
                category: createCategory(category: $category) {
                    ...FullCategory
                }
            }

            ${fragments.full}`,
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
            message: `Couldn't create category. ${error.message}`
        })
    }
    
    return category
}

export const saveCategory = (categoryID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const cachedCategory = {
        ...getState().categories[categoryID]
    }
    delete cachedCategory._id
    delete cachedCategory.children
    delete cachedCategory.__typename
    const categoryRes = await client(token).mutate({
        mutation: gql`mutation ($categoryID: ID!, $category: CategoryInput!) {
                category: updateCategory(id: $categoryID, category: $category) {
                    ...FullCategory
                }
            }
        
            ${fragments.full}`,
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
            message: `Couldn't save category. ${error.message}`
        })
    }
}

export const removeCategory = (categoryID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    await client(token).mutate({
        mutation: gql`mutation ($categoryID: ID!) {
                category: removeCategory(id: $categoryID) {
                    data {_id}
                    error
                }
            }`,
        variables: {categoryID}
    })
    dispatch({
        type: CATEGORY_REMOVE,
        categoryID
    })
}

// XXX Deprecated - categories do not exist on accounts no more
// Make specified category a "root" category - no parent category, but connected
// to the account itself
export const setCategoryAsRoot = (categoryID: string, itemRef: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const accountRes = await client(token).mutate({
        mutation: gql`mutation ($categoryID: ID!, $itemRef: String!) {
                account: addRootCategory(categoryID: $categoryID, itemRef: $itemRef) {
                    data {_id}
                    error
                }
            }`,
        variables: {categoryID, itemRef}
    })
    const {data, error} = accountRes.data.account
    const account = data

    dispatch({
        type: CATEGORY_SET_ROOT,
        account
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't make category root. ${error.message}`
        })
    }
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

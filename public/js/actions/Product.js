import gql from "graphql-tag"
import client from "../graphQL/Client"
import {
    PRODUCT_FETCH, PRODUCT_LIST, PRODUCT_CREATE, PRODUCT_ADD_CATEGORY,
    ERROR_DISPLAY_MSG
} from "./Types"
import Fragments from "../graphQL/Fragments"

const fragments = Fragments.product

export const fetchProduct = id => async (dispatch, getState) => {
    const token = getState().activeToken
    const productRes = await client(token).query({
        query: gql`query ($id: ID!) {
                product(id: $id) {
                    ...FullProduct
                }
            }
        
            ${fragments.full}`,
        variables: {id}
    })
    const res     = productRes.data.product
    const product = res.data
    const error   = res.error

    dispatch({
        type: PRODUCT_FETCH,
        id, product
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't fetch input type. ${error.message}`
        })
    }
}

export const listProducts = async (dispatch, getState) => {
    const token = getState().activeToken
    const productRes = await client(token).query({
        query: gql`query {
                products {
                    ...MinimalProductList
                }
            }
        
            ${fragments.minimalList}`
    })
    const res      = productRes.data.products
    const products = res.data
    const error    = res.error
    dispatch({
        type: PRODUCT_LIST,
        products
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't fetch input type. ${error.message}`
        })
    }
}

export const createProduct = product => async (dispatch, getState) => {
    const token = getState().activeToken
    const productRes = await client(token).mutate({
        mutation: gql`mutation ($product: ProductInput!) {
                product: createProduct(product: $product) {
                    ...FullProduct
                }
            }
        
            ${fragments.full}`,
        variables: {product}
    })
    const res           = productRes.data.product
    const {data, error} = res

    dispatch({
        type: PRODUCT_CREATE,
        product: data
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't fetch input type. ${error.message}`
        })
    }
}

export const addCategoryToProduct = (productID, categoryID) => async (dispatch, getState) => {
    const token = getState().activeToken
    const productRes = await client(token).mutate({
        mutation: gql`mutation ($productID: ID!, $categoryID: ID!) {
                product: addCategoryToProduct(productID: $productID, categoryID: $categoryID) {
                    ...FullProduct
                }
            }
        
            ${fragments.full}`,
        variables: {productID, categoryID}
    })
    const res           = productRes.data.product
    const {data, error} = res

    dispatch({
        type: PRODUCT_ADD_CATEGORY,
        product: data
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't add category to product. ${error.message}`
        })
    }
}

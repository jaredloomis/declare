// @flow
import gql from "graphql-tag"
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    ELEMENT_FETCH, ELEMENT_UPDATE, ELEMENT_LIST,
    ELEMENT_CREATE, ELEMENT_SAVE, ELEMENT_REMOVE,
    ERROR_DISPLAY_MSG
} from "./Types"
import Fragments from "../graphQL/Fragments"

const fragments = Fragments.element

export const fetchElement = (id: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const elementRes = await client(token).query({
        query: gql`($id: ID!) {
            element(id: $id) {
                ...FullElement
            }

            ${fragments.full}
        }`,
        variables: {id}
    })
    const {data, error} = elementRes.data.element
    const element = data

    dispatch({
        type: ELEMENT_FETCH,
        id, element
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }
}

export const listElements = async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const elementsRes = await client(token).query({
        query: gql`{
                elements {
                    ...FullElementList
                }
            }
            
            ${fragments.fullList}`
    })
    const {data, error} = elementsRes.data.elements
    const elements = data

    dispatch({
        type: ELEMENT_LIST,
        elements
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }
}

export const updateElement = (id: string, element: any) => ({
    type: ELEMENT_UPDATE,
    id, element
})

export const createElement = (elementInput: any) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const elementRes = await client(token).mutate({
        mutation: gql`mutation ($element: ElementInput) {
                element: createElement(element: $element) {
                    ...FullElement
                }
            }
            
            ${fragments.full}`,
        variables: {element: elementInput}
    })
    const {data, error} = elementRes.data.element
    const element = data

    dispatch({
        type: ELEMENT_CREATE,
        element
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }

    return element
}

export const saveElement = (id: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const curElement = getState().elements[id]
    delete curElement._id
    delete curElement.__typename
    const newElementRes = await client(token).mutate({
        mutation: gql`mutation ($id: ID!, $element: ElementInput) {
                element: updateElement(id: $id, element: $element) {
                    ...FullElement
                }
            }
        
            ${fragments.full}`,
        variables: {element: curElement, id}
    })
    const {data, error} = newElementRes.data.element
    const newElement = data

    dispatch({
        type: ELEMENT_SAVE,
        element: newElement,
        id
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }
}

export const removeElement = (id: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const elementRes = await client(token).mutate({
        mutation: gql`mutation ($id: ID!) {
            element: removeElement(id: $id) {
                ...FullElement
            }
        }
        
        ${fragments.full}`,
        variables: {id}
    })
    const {error} = elementRes.data.element

    dispatch({
        type: ELEMENT_REMOVE,
        id
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }
}

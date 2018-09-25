// @flow
import gql from "graphql-tag"
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {cacheExpired} from "../constants/cache"
import {
    ELEMENT_FETCH, ELEMENT_UPDATE, ELEMENT_LIST,
    ELEMENT_CREATE, ELEMENT_SAVE, ELEMENT_REMOVE,
    ERROR_DISPLAY_MSG
} from "./Types"
import {handleError} from "./Error"
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

    if(error) {
        return dispatch(handleError(error, "Couldn't fetch element."))
    }

    dispatch({
        type: ELEMENT_FETCH,
        id, element
    })

    return element
}

export const listElements = async (dispatch: Func, getState: Func) => {
    const state = getState()

    // Check if we should just use cache
    if(!cacheExpired(state.meta.elements.lastList))
        return state.elements

    const token = state.activeToken
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

    if(error) {
        return dispatch(handleError(error, "Couldn't list elements."))
    }

    dispatch({
        type: ELEMENT_LIST,
        elements
    })

    return elements
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

    if(error) {
        return dispatch(handleError(error, "Couldn't create element."))
    }

    dispatch({
        type: ELEMENT_CREATE,
        element
    })

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

    if(error) {
        return dispatch(handleError(error, "Couldn't save element."))
    }

    dispatch({
        type: ELEMENT_SAVE,
        element: newElement,
        id
    })
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

    if(error) {
        return dispatch(handleError(error, "Couldn't remove element."))
    }

    dispatch({
        type: ELEMENT_REMOVE,
        id
    })
}

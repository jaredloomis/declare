// @flow
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    ELEMENT_FETCH, ELEMENT_UPDATE, ELEMENT_LIST,
    ELEMENT_CREATE, ELEMENT_SAVE, ELEMENT_REMOVE
} from "./Types"

export const fetchElement = (id: string) => async (dispatch: Func) => {
    const {element} = await client.query(`($id: ID!) {
        element(id: $id) {
            _id
            name
            selector
            inputType
        }
    }`, {id})
    dispatch({
        type: ELEMENT_FETCH,
        id, element
    })
}

export const listElements = async (dispatch: Func) => {
    const {elements} = await client.query(` {
        elements {
            _id
            name
            selector
            inputType
        }
    }`)
    dispatch({
        type: ELEMENT_LIST,
        elements
    })
}

export const updateElement = (id: string, element: any) => ({
    type: ELEMENT_UPDATE,
    id, element
})

export const createElement = (elementInput: any) => async (dispatch: Func) => {
    const {element} = await client.mutate(`($element: ElementInput) {
        element: createElement(element: $element) {
            _id
            name
            selector
            inputType
        }
    }`, {element: elementInput})
    dispatch({
        type: ELEMENT_CREATE,
        element
    })
}

export const saveElement = (id: string) => async (dispatch: Func, getState: Func) => {
    const curElement = getState().elements[id]
    delete curElement._id
    const {newElement} = await client.mutate(`($id: ID!, $element: ElementInput) {
        element: updateElement(id: $id, element: $element) {
            _id
            name
            selector
            inputType
        }
    }`, {element: curElement, id})
    dispatch({
        type: ELEMENT_SAVE,
        element: newElement,
        id
    })
}

export const removeElement = (id: string) => async (dispatch: Func) => {
    const {element} = await client.mutate(`($id: ID!) {
        element: removeElement(id: $id) {
            _id
        }
    }`, {id})
    dispatch({
        type: ELEMENT_REMOVE,
        id
    })
}

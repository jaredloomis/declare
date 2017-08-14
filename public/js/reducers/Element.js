// @flow
import {
    ELEMENT_FETCH, ELEMENT_UPDATE, ELEMENT_LIST,
    ELEMENT_CREATE, ELEMENT_SAVE
} from "../actions/Types"

export default (state, action) => {
    if(action.type === ELEMENT_FETCH) {
        return {
            ...state,
            elements: {
                ...state.elements,
                [action.id]: action.element
            }
        }
    } else if(action.type === ELEMENT_UPDATE) {
        return {
            ...state,
            elements: {
                ...state.elements,
                [action.id]: {
                    ...state.elements[action.id],
                    ...action.element
                }
            }
        }
    } else if(action.type === ELEMENT_LIST) {
        const elements = action.elements.reduce((acc, el) => {
            return Object.assign(acc, {
                [el._id]: {
                    ...state.elements[el._id],
                    ...el
                }
            })
        }, {})

        return {
            ...state,
            elements: {
                ...state.elements,
                ...elements
            }
        }
    } else if(action.type === ELEMENT_CREATE) {
        return {
            ...state,
            elements: {
                ...state.elements,
                [action.element._id]: action.element
            }
        }
    } else if(action.type === ELEMENT_SAVE) {
        return {
            ...state,
            elements: {
                ...state.elements,
                [action.id]: action.element
            }
        }
    } else {
        return state
    }
}

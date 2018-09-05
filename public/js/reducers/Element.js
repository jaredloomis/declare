// @flow
import {
    ELEMENT_FETCH, ELEMENT_UPDATE, ELEMENT_LIST,
    ELEMENT_CREATE, ELEMENT_SAVE, ELEMENT_REMOVE
} from "../actions/Types"

export default (state: any, action: any) => {
    if(action.type === ELEMENT_FETCH &&
       action.id && action.element) {
        return {
            ...state,
            elements: {
                ...state.elements,
                [action.id]: action.element
            }
        }
    } else if(action.type === ELEMENT_UPDATE &&
              action.id && action.element) {
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
    } else if(action.type === ELEMENT_LIST &&
              Array.isArray(action.elements)) {
        const elements = ((action.elements: any): Array<{_id: string}>)
            .reduce((acc, el: {_id: string}) => {
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
            },
            meta: {
                ...state.meta,
                elements: {
                    ...state.meta.elements,
                    lastList: new Date()
                }
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
    } else if(action.type === ELEMENT_REMOVE) {
        const elements = Object.assign({}, state.elements)
        delete elements[action.id]
        return {
            ...state,
            elements
        }
    } else if(action.type === ELEMENT_SAVE &&
              action.element && action.id) {
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

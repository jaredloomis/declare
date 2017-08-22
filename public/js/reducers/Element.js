// @flow
import {
    ELEMENT_FETCH, ELEMENT_UPDATE, ELEMENT_LIST,
    ELEMENT_CREATE, ELEMENT_SAVE
} from "../actions/Types"

export default (state: any, action: {type: string}) => {
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
            }
        }
    } else if(action.type === ELEMENT_CREATE &&
              action.element && action.element._id) {
        return {
            ...state,
            elements: {
                ...state.elements,
                [action.element._id]: action.element
            }
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

import {
    ENVIRONMENT_FETCH, ENVIRONMENT_UPDATE, ENVIRONMENT_LIST,
    ENVIRONMENT_CREATE, ENVIRONMENT_SAVE, ENVIRONMENT_REMOVE
} from "../actions/Types"

export default (state, action) => {
    if(action.type === ENVIRONMENT_FETCH) {
        return {
            ...state,
            environments: {
                ...state.environments,
                [action.id]: action.environment
            }
        }
    } else if(action.type === ENVIRONMENT_UPDATE) {
        return {
            ...state,
            environments: {
                ...state.environments,
                [action.id]: {
                    ...state.environments[action.id],
                    ...action.environment
                }
            }
        }
    } else if(action.type === ENVIRONMENT_LIST) {
        const environments = action.environments
            .reduce((acc, el) => {
                return Object.assign(acc, {
                    [el._id]: {
                        ...state.environments[el._id],
                        ...el
                    }
                })
        }, {})

        return {
            ...state,
            environments: {
                ...state.environments,
                ...environments
            }
        }
    } else if(action.type === ENVIRONMENT_CREATE) {
        return {
            ...state,
            environments: {
                ...state.environments,
                [action.environment._id]: action.environment
            }
        }
    } else if(action.type === ENVIRONMENT_REMOVE) {
        const environments = Object.assign({}, state.environments)
        delete environments[action.id]
        return {
            ...state,
            environments
        }
    } else if(action.type === ENVIRONMENT_SAVE) {
        return {
            ...state,
            environments: {
                ...state.environments,
                [action.id]: action.environment
            }
        }
    } else {
        return state
    }
}

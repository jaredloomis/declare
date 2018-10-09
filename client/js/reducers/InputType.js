import {
    INPUT_TYPE_FETCH, INPUT_TYPE_CONSTRAINT_UPDATE,
    INPUT_TYPE_CREATE,
    INPUT_TYPE_LIST, INPUT_TYPE_ADD_CONSTRAINT,
    INPUT_TYPE_SAVE, INPUT_TYPE_REMOVE,
    INPUT_TYPE_CONSTRAINT_REMOVE,
    INPUT_TYPE_UPDATE
} from "../actions/Types"

export default (state={inputTypes: {}}, action) => {
    if(action.type === INPUT_TYPE_FETCH) {
        return {
            ...state,
            inputTypes: {
                ...state.inputTypes,
                [action.id]: action.inputType
            }
        }
    } else if(action.type === INPUT_TYPE_LIST) {
        const {inputTypes} = action
        const newInputTypes = inputTypes.reduce((acc, inTy) => {
            return {
                ...acc,
                [inTy._id]: {
                    ...acc[inTy._id],
                    ...inTy
                }
            }
        }, state.inputTypes)
        return {
            ...state,
            inputTypes: newInputTypes
        }
    } else if(action.type === INPUT_TYPE_CREATE) {
        const {inputType} = action
        return {
            ...state,
            inputTypes: {
                ...state.inputTypes,
                [inputType._id]: inputType
            }
        }
    } else if(action.type === INPUT_TYPE_UPDATE) {
        // XXX Must explicitly update this if InputType schema changes
        const {id, name} = action
        return {
            ...state,
            inputTypes: {
                ...state.inputTypes,
                [id]: {
                    ...state.inputTypes[id],
                    name
                }
            }
        }
    } else if(action.type === INPUT_TYPE_CONSTRAINT_UPDATE) {
        const {id, constraintI, value} = action
        const curInputType = state.inputTypes[id]
        const newInputType = {
            ...curInputType,
            constraints: curInputType.constraints.map((it, i) =>
                i === constraintI ? {...it, ...value} : it
            )
        }

        return {
            ...state,
            inputTypes: {
                ...state.inputTypes,
                [id]: newInputType
            }
        }
    } else if(action.type === INPUT_TYPE_CONSTRAINT_REMOVE) {
        const {id, constraintI} = action
        const curInputType = state.inputTypes[id]
        const newInputType = {
            ...curInputType,
            constraints: curInputType.constraints.filter((constr, i) =>
                i !== constraintI
            )
        }

        return {
            ...state,
            inputTypes: {
                ...state.inputTypes,
                [id]: newInputType
            }
        }
    } else if(action.type === INPUT_TYPE_ADD_CONSTRAINT) {
        const {id} = action
        const curInputType = state.inputTypes[id]
        const newInputType = {
            ...curInputType,
            constraints: (curInputType.constraints || []).concat([
                {}
            ])
        }

        return {
            ...state,
            inputTypes: {
                ...state.inputTypes,
                [id]: newInputType
            }
        }
    } else if(action.type === INPUT_TYPE_SAVE) {
        return {
            ...state,
            inputTypes: {
                ...state.inputTypes,
                [action.id]: action.inputType
            }
        }
    } else if(action.type === INPUT_TYPE_REMOVE) {
        const inputTypes = Object.assign({}, state.inputTypes)
        delete inputTypes[action.id]
        return {
            ...state,
            inputTypes
        }
    } else {
        return state
    }
}

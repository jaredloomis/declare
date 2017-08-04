import {
    INPUT_TYPE_FETCH, INPUT_TYPE_CONSTRAINT_UPDATE,
    INPUT_TYPE_LIST, INPUT_TYPE_ADD_CONSTRAINT,
    INPUT_TYPE_SAVE
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
    } else {
        return state
    }
}

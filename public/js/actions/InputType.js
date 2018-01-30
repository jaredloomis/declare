// @flow
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    INPUT_TYPE_FETCH, INPUT_TYPE_CONSTRAINT_UPDATE,
    INPUT_TYPE_LIST, INPUT_TYPE_CREATE, INPUT_TYPE_ADD_CONSTRAINT,
    INPUT_TYPE_SAVE, INPUT_TYPE_REMOVE, INPUT_TYPE_CONSTRAINT_REMOVE,
    INPUT_TYPE_UPDATE
} from "./Types"

export const fetchInputType = (id: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const {inputType} = await client(token).query(`($id: ID!) {
        inputType(id: $id) {
            _id
            name
            constraints {
                regex
                minLength
                maxLength
            }
        }
    }`, {id})
    dispatch({
        type: INPUT_TYPE_FETCH,
        id, inputType
    })
}

export const listInputTypes = async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const {inputTypes} = await client(token).query(`{
        inputTypes {
            _id
            name
            constraints {
                regex
                minLength
                maxLength
            }
        }
    }`)

    dispatch({
        type: INPUT_TYPE_LIST,
        inputTypes
    })
}

/* For updating top-level simple properties of InputType (like name) */
export const updateInputType = (id: string, valMap: any) => ({
    type: INPUT_TYPE_UPDATE,
    id,
    ...valMap
})

export const updateInputTypeConstraint =
    (id: string, constraintI: number, value: any) => ({
            type: INPUT_TYPE_CONSTRAINT_UPDATE,
            id, constraintI, value
        })

export const removeInputTypeConstraint = (id: string, constraintI: number) => ({
    type: INPUT_TYPE_CONSTRAINT_REMOVE,
    id, constraintI
})

export const createInputType = (name: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const {inputType} = await client(token).mutate(`($inputType: InputTypeInput!) {
        inputType: createInputType(inputType: $inputType) {
            _id
            name
        }
    }`, {inputType: {name}})

    dispatch({
        type: INPUT_TYPE_CREATE,
        inputType
    })
}

export const addConstraint = (inputTypeID: string) => ({
    type: INPUT_TYPE_ADD_CONSTRAINT,
    id: inputTypeID
})

export const saveInputType = (inputTypeID: string) =>
    async (dispatch: Func, getState: Func) => {
        const token = getState().activeToken
        const inputType = getState().inputTypes[inputTypeID]
        delete inputType._id
        const inputTypeNewRet = await client(token).mutate(`($id: ID!, $inputType: InputTypeInput!) {
            inputType: updateInputType(id: $id, inputType: $inputType) {
                _id
                name
                constraints {
                    regex
                    minLength
                    maxLength
                }
            }
        }`, {id: inputTypeID, inputType})
        dispatch({
            type: INPUT_TYPE_SAVE,
            id: inputTypeID,
            inputType: inputTypeNewRet.inputType
        })
    }

export const removeInputType = (id: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const {inputType} = await client(token).mutate(`($id: ID!) {
        inputType: removeInputType(id: $id) {
            _id
        }
    }`, {id})
    dispatch({
        type: INPUT_TYPE_REMOVE,
        id
    })
}

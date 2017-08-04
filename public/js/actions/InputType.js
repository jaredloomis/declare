// @flow
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    INPUT_TYPE_FETCH, INPUT_TYPE_CONSTRAINT_UPDATE,
    INPUT_TYPE_LIST, INPUT_TYPE_CREATE, INPUT_TYPE_ADD_CONSTRAINT,
    INPUT_TYPE_SAVE
} from "./Types"

export const fetchInputType = (id: string) => async (dispatch: Func) => {
    const {inputType} = await client.query(`($id: ID!) {
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

export const listInputTypes = () => async (dispatch: Func) => {
    const {inputTypes} = await client.query(`{
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

export const updateInputTypeConstraint =
    (id: string, constraintI: number, value: any) => ({
            type: INPUT_TYPE_CONSTRAINT_UPDATE,
            id, constraintI, value
        })

export const createInputType = (name: string) => async (dispatch: Func) => {
    const {inputType} = await client.mutate(`($inputType: InputTypeInput!) {
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
        const inputType = getState().inputTypes[inputTypeID]
        delete inputType._id
        const inputTypeNewRet = await client.mutate(`($id: ID!, $inputType: InputTypeInput!) {
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

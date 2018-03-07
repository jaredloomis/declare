// @flow
import gql from "graphql-tag"
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    INPUT_TYPE_FETCH, INPUT_TYPE_CONSTRAINT_UPDATE,
    INPUT_TYPE_LIST, INPUT_TYPE_CREATE, INPUT_TYPE_ADD_CONSTRAINT,
    INPUT_TYPE_SAVE, INPUT_TYPE_REMOVE, INPUT_TYPE_CONSTRAINT_REMOVE,
    INPUT_TYPE_UPDATE, ERROR_DISPLAY_MSG
} from "./Types"
import Fragments from "../graphQL/Fragments"

const fragments = Fragments.inputType

export const fetchInputType = (id: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const inputTypeRes = await client(token).query({
        query: gql`($id: ID!) {
                inputType(id: $id) {
                    ...FullInputType
                }
            }
        
            ${fragments.full}`,
        variables: {id}
    })
    const res       = inputTypeRes.data.inputType
    const inputType = res.data
    const error     = res.error
    dispatch({
        type: INPUT_TYPE_FETCH,
        id, inputType
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't fetch input type. ${error.message}`
        })
    }
}

export const listInputTypes = async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const inputTypesRes = await client(token).query({
        query: gql`{
                inputTypes {
                    ...FullInputTypeList
                }
            }
        
            ${fragments.fullList}`
    })
    const res        = inputTypesRes.data.inputTypes
    const inputTypes = res.data
    const error      = res.error

    dispatch({
        type: INPUT_TYPE_LIST,
        inputTypes
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't list input types. ${error.message}`
        })
    }
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
    const inputTypeRes = await client(token).mutate({
        mutation: gql`mutation ($inputType: InputTypeInput!) {
                inputType: createInputType(inputType: $inputType) {
                    data {
                        _id
                        name
                    }
                    error
                }
            }`,
        variables: {inputType: {name}}
    })
    const res       = inputTypeRes.data.inputType
    const inputType = res.data
    const error     = res.error

    dispatch({
        type: INPUT_TYPE_CREATE,
        inputType
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't create input type. ${error}`
        })
    }

    return inputType
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
        const inputTypeNewRes = await client(token).mutate({
            mutation: gql`mutation ($id: ID!, $inputType: InputTypeInput!) {
                    inputType: updateInputType(id: $id, inputType: $inputType) {
                        _id
                        name
                        constraints {
                            regex
                            minLength
                            maxLength
                        }
                    }
                }`,
            variables: {id: inputTypeID, inputType}
        })
        const res          = inputTypeNewRes.data.inputType
        const inputTypeNew = res.data
        const error        = res.error

        dispatch({
            type: INPUT_TYPE_SAVE,
            id: inputTypeID,
            inputType: inputTypeNew
        })

        if(error) {
            dispatch({
                type: ERROR_DISPLAY_MSG,
                message: `Couldn't save input type. ${error}`
            })
        }
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

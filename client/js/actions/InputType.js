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
import {handleError} from "./Error"
import Fragments from "../graphQL/Fragments"

const fragments = Fragments.inputType

export const fetchInputType = (id: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const inputTypeRes = await client(token).query({
        query: gql`query ($id: ID!) {
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

    if(error) {
        return dispatch(handleError(error, "Couldn't fetch input type."))
    }

    dispatch({
        type: INPUT_TYPE_FETCH,
        id, inputType
    })

    return inputType
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

    if(error) {
        return dispatch(handleError(error, "Couldn't list input types."))
    }

    dispatch({
        type: INPUT_TYPE_LIST,
        inputTypes
    })

    return inputTypes
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

export const createInputType = (name: string, product: string) => async (dispatch: Func, getState: Func) => {
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
        variables: {inputType: {name, product}}
    })
    const res       = inputTypeRes.data.inputType
    const inputType = res.data
    const error     = res.error

    if(error) {
        return dispatch(handleError(error, "Couldn't create input type."))
    }

    dispatch({
        type: INPUT_TYPE_CREATE,
        inputType
    })

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
        delete inputType.__typename
        const inputTypeNewRes = await client(token).mutate({
            mutation: gql`mutation ($id: ID!, $inputType: InputTypeInput!) {
                    inputType: updateInputType(id: $id, inputType: $inputType) {
                        ...FullInputType
                    }
                }
            
                ${fragments.full}`,
            variables: {id: inputTypeID, inputType}
        })
        const res          = inputTypeNewRes.data.inputType
        const inputTypeNew = res.data
        const error        = res.error

        if(error) {
            return dispatch(handleError(error, "Couldn't save input type."))
        }

        dispatch({
            type: INPUT_TYPE_SAVE,
            id: inputTypeID,
            inputType: inputTypeNew
        })

        return inputTypeNew
    }

export const removeInputType = (id: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const {inputType} = await client(token).mutate({
        mutation: gql`mutation ($id: ID!) {
            inputType: removeInputType(id: $id) {
                ...FullInputType
            }
        }
        
        ${fragments.full}`,
        variables: {id}
    })
    dispatch({
        type: INPUT_TYPE_REMOVE,
        id
    })
}

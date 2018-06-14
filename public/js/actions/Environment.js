import gql from "graphql-tag"
import client from "../graphQL/Client"
import {
    ENVIRONMENT_FETCH, ENVIRONMENT_UPDATE, ENVIRONMENT_LIST,
    ENVIRONMENT_CREATE, ENVIRONMENT_SAVE, ENVIRONMENT_REMOVE,
    ERROR_DISPLAY_MSG
} from "./Types"
import Fragments from "../graphQL/Fragments"

const fragments = Fragments.environment

export const fetchEnvironment = id => async (dispatch, getState) => {
    const token = getState().activeToken
    const environmentRes = await client(token).query({
        query: gql`($id: ID!) {
            environment(id: $id) {
                ...FullEnvironment
            }

            ${fragments.full}
        }`,
        variables: {id}
    })
    const {data, error} = environmentRes.data.environment
    const environment = data

    if(error) {
        return dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }

    dispatch({
        type: ENVIRONMENT_FETCH,
        id, environment
    })
}

export const listEnvironments = async (dispatch, getState) => {
    const token = getState().activeToken
    const environmentsRes = await client(token).query({
        query: gql`{
                environments {
                    ...MinimalEnvironmentList
                }
            }
            
            ${fragments.minimalList}`
    })
    const {data, error} = environmentsRes.data.environments
    const environments = data

    dispatch({
        type: ENVIRONMENT_LIST,
        environments
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }
}

export const updateEnvironment = (id, environment: any) => ({
    type: ENVIRONMENT_UPDATE,
    id, environment
})

export const createEnvironment = (environmentInput: any) => async (dispatch, getState) => {
    const token = getState().activeToken
    const environmentRes = await client(token).mutate({
        mutation: gql`mutation ($environment: EnvironmentInput) {
                environment: createEnvironment(environment: $environment) {
                    ...FullEnvironment
                }
            }
            
            ${fragments.full}`,
        variables: {environment: environmentInput}
    })
    const {data, error} = environmentRes.data.environment
    const environment = data

    dispatch({
        type: ENVIRONMENT_CREATE,
        environment
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }

    return environment
}

export const saveEnvironment = (id) => async (dispatch, getState) => {
    const token = getState().activeToken
    const curEnvironment = getState().environments[id]
    delete curEnvironment._id
    delete curEnvironment.__typename
    const newEnvironmentRes = await client(token).mutate({
        mutation: gql`mutation ($id: ID!, $environment: EnvironmentInput) {
                environment: updateEnvironment(id: $id, environment: $environment) {
                    ...FullEnvironment
                }
            }
        
            ${fragments.full}`,
        variables: {environment: curEnvironment, id}
    })
    const {data, error} = newEnvironmentRes.data.environment
    const newEnvironment = data

    dispatch({
        type: ENVIRONMENT_SAVE,
        environment: newEnvironment,
        id
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }
}

export const removeEnvironment = (id) => async (dispatch, getState) => {
    const token = getState().activeToken
    const environmentRes = await client(token).mutate({
        mutation: gql`mutation ($id: ID!) {
            environment: removeEnvironment(id: $id) {
                ...FullEnvironment
            }
        }
        
        ${fragments.full}`,
        variables: {id}
    })
    const {error} = environmentRes.data.environment

    dispatch({
        type: ENVIRONMENT_REMOVE,
        id
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }
}

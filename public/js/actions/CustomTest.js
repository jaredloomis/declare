// @flow
import gql from "graphql-tag"
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    CUSTOM_TEST_UPDATE_ACTION, CUSTOM_TEST_FETCH,
    CUSTOM_TEST_ADD_ACTION, CUSTOM_TEST_REMOVE_ACTION,
    CUSTOM_TEST_CREATE, CUSTOM_TEST_SAVE, CUSTOM_TEST_UPDATE_INFO,
    CUSTOM_TEST_REMOVE, CUSTOM_TEST_EXECUTE, ERROR_DISPLAY_MSG
} from "./Types"
import {fetchReport} from "./Page"
import Fragments from "../graphQL/Fragments"

const fragments = Fragments.customTest

export const fetchCustomTest = (customTestID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const customTestRes = await client(token).query({
        query: gql`query ($id: ID!) {
                customTest(id: $id) {
                    ...FullCustomTest
                }
            }
        
            ${fragments.full}`,
        variables: {id: customTestID}
    })
    const res        = customTestRes.data.customTest
    const customTest = res.data
    const error      = res.error

    dispatch({
        type: CUSTOM_TEST_FETCH,
        customTestID, customTest
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't fetch custom test. ${error.message}`
        })
    }
}

export const createCustomTest = (pageID: string, customTestInput: any) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    customTestInput.owner = pageID
    const customTestRes = await client(token).mutate({
        mutation: gql`mutation ($pageID: ID!, $customTest: CustomTestInput) {
                customTest: createCustomTest(pageID: $pageID, customTest: $customTest) {
                    ...FullCustomTest
                }
            }
        
            ${fragments.full}`,
        variables: {pageID, customTest: customTestInput}
    })
    const res        = customTestRes.data.customTest
    const customTest = res.data
    const error      = res.error

    dispatch({
        type: CUSTOM_TEST_CREATE,
        customTest, pageID
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't create custom test. ${error.message}`
        })
    }
}

export const saveCustomTest = (testID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const cachedTest = getState().customTests[testID]
    delete cachedTest._id
    delete cachedTest.reports
    delete cachedTest.__typename
    const customTestRes = await client(token).mutate({
        mutation: gql`mutation ($testID: ID!, $customTest: CustomTestInput) {
                customTest: updateCustomTest(id: $testID, customTest: $customTest) {
                    ...FullCustomTest
                }
            }
        
            ${fragments.full}`,
        variables: {
            testID,
            customTest: cachedTest
        }
    })
    const res        = customTestRes.data.customTest
    const customTest = res.data
    const error      = res.error

    dispatch({
        type: CUSTOM_TEST_SAVE,
        testID,
        customTest
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't save custom test. ${error.message}`
        })
    }
}

export const updateCustomTestAction = (customTestID: string,
                                       actionI: number, action: any) => ({
    type: CUSTOM_TEST_UPDATE_ACTION,
    customTestID, actionI, action
})

export const addCustomTestAction = (customTestID: string, action: any) => ({
    type: CUSTOM_TEST_ADD_ACTION,
    customTestID, action
})

export const removeCustomTestAction = (customTestID: string, actionI: number) => ({
    type: CUSTOM_TEST_REMOVE_ACTION,
    customTestID, actionI
})

export const updateCustomTestInfo = (customTestID: string, update: any) => ({
    type: CUSTOM_TEST_UPDATE_INFO,
    customTestID, update
})

export const removeCustomTest = (customTestID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    await client(token).mutate({
        mutation: gql`mutation ($customTestID: ID!) {
                customTest: removeCustomTest(id: $customTestID) {
                    ...MinimalCustomTest
                }
            }
        
            ${fragments.minimal}`,
        variables: {customTestID}
    })
    dispatch({
        type: CUSTOM_TEST_REMOVE,
        customTestID
    })
}

export const executeCustomTest = (customTestID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    // Fire off event indication execution start
    dispatch({
        type: CUSTOM_TEST_EXECUTE,
        customTestID
    })
    // Start test
    const customTestRes = await client(token).mutate({
        mutation: gql`mutation ($id: ID!) {
                customTest: executeCustomTest(id: $id) {
                    _id
                }
            }`,
        variables: {id: customTestID}
    })
    const res        = customTestRes.data.customTest
    const customTest = res.data
    const error      = res.error
    // Get the id of the report added to test
    const latestReportID = customTest.reports[customTest.reports.length-1]
    // Fetch that Report
    dispatch(fetchReport(latestReportID))
    // Fire off event to indicate test is complete and results were recieved
    dispatch({
        type: CUSTOM_TEST_EXECUTE,
        customTestID,
        report: latestReportID
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't fetch custom test. ${error}`
        })
    }
}

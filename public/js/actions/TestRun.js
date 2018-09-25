import gql from "graphql-tag"
import client from "../graphQL/Client"
import {
    TEST_RUN_FETCH, TEST_RUN_LIST, TEST_RUN_CREATE, TEST_RUN_UPDATE,
    TEST_RUN_EXECUTE,
    ERROR_DISPLAY_MSG
} from "./Types"
import Fragments from "../graphQL/Fragments"
import {fetchReportBatch} from "./ReportBatch"
import {handleError} from "./Error"

const fragments = Fragments.testRun

export const fetchTestRun = id => async (dispatch, getState) => {
    const token = getState().activeToken
    const testRunRes = await client(token).query({
        query: gql`query ($id: ID!) {
                testRun(id: $id) {
                    ...FullTestRun
                }
            }
        
            ${fragments.full}`,
        variables: {id}
    })
    const res     = testRunRes.data.testRun
    const testRun = res.data
    const error   = res.error

    if(error) {
        return dispatch(handleError(error, "Couldn't fetch test run."))
    }

    dispatch({
        type: TEST_RUN_FETCH,
        id, testRun
    })

    return testRun
}

export const listTestRuns = async (dispatch, getState) => {
    const token = getState().activeToken
    const testRunRes = await client(token).query({
        query: gql`query {
                testRuns {
                    ...MinimalTestRunList
                }
            }
        
            ${fragments.minimalList}`
    })
    const res      = testRunRes.data.testRuns
    const testRuns = res.data
    const error    = res.error

    if(error) {
        return dispatch(handleError(error, "Couldn't list test runs."))
    }

    dispatch({
        type: TEST_RUN_LIST,
        testRuns
    })

    return testRuns
}

export const createTestRun = testRun => async (dispatch, getState) => {
    const token = getState().activeToken
    const testRunRes = await client(token).mutate({
        mutation: gql`mutation ($testRun: TestRunInput!) {
                testRun: createTestRun(testRun: $testRun) {
                    ...FullTestRun
                }
            }
        
            ${fragments.full}`,
        variables: {testRun}
    })
    const res           = testRunRes.data.testRun
    const {data, error} = res

    if(error) {
        return dispatch(handleError(error, "Couldn't create test run."))
    }

    dispatch({
        type: TEST_RUN_CREATE,
        testRun: data
    })
}

export const updateTestRun = (id, testRun) => async (dispatch, getState) => {
    delete testRun._id
    delete testRun.__typename
    const token = getState().activeToken
    const testRunRes = await client(token).mutate({
        mutation: gql`mutation ($id: ID!, $testRun: TestRunInput!) {
                testRun: updateTestRun(id: $id, testRun: $testRun) {
                    ...FullTestRun
                }
            }
        
            ${fragments.full}`,
        variables: {
            id, testRun
        }
    })
    const {data, error} = testRunRes.data.testRun

    if(error) {
        return dispatch(handleError(error, "Couldn't update test run."))
    }

    dispatch({
        type: TEST_RUN_UPDATE,
        id,
        testRun: data
    })
}

export const executeTestRun = id => async (dispatch, getState) => {
    const token = getState().activeToken
    const testRunRes = await client(token).mutate({
        mutation: gql`mutation ($id: ID!) {
                testRun: executeTestRun(id: $id) {
                    ...FullTestRun
                }
            }
        
            ${fragments.full}`,
        variables: {id}
    })
    const {data, error} = testRunRes.data.testRun
    const testRun       = data

    if(error) {
        return dispatch(handleError(error, "Couldn't execute test run."))
    }

    // Get the id of the report batch added to test
    const latestBatchID = testRun.reportBatches[testRun.reportBatches.length-1]
    if(latestBatchID) {
        // Fetch that ReportBatch
        dispatch(fetchReportBatch(latestBatchID))
    }

    dispatch({
        type: TEST_RUN_EXECUTE,
        id,
        testRun
    })
}


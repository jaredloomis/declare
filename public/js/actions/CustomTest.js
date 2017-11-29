// @flow
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    CUSTOM_TEST_UPDATE_ACTION, CUSTOM_TEST_FETCH,
    CUSTOM_TEST_ADD_ACTION, CUSTOM_TEST_REMOVE_ACTION,
    CUSTOM_TEST_CREATE, CUSTOM_TEST_SAVE, CUSTOM_TEST_UPDATE_INFO,
    CUSTOM_TEST_REMOVE, CUSTOM_TEST_EXECUTE
} from "./Types"
import {fetchReport} from "./Page"

export const fetchCustomTest = (customTestID: string) => async (dispatch: Func) => {
    const {customTest} = await client.query(`query ($id: ID!) {
        customTest(id: $id) {
            _id
            owner
            name
            actions {
                actionType
                values
            }
            reports
        }
    }`, {id: customTestID})

    dispatch({
        type: CUSTOM_TEST_FETCH,
        customTestID, customTest
    })
}

export const createCustomTest = (pageID: string, customTestInput: any) => async (dispatch: Func) => {
    customTestInput.owner = pageID
    const {customTest} = await client.mutate(`($pageID: ID!, $customTest: CustomTestInput) {
        customTest: createCustomTest(pageID: $pageID, customTest: $customTest) {
            _id
            owner
            name
            actions {
                actionType
                values
            }
            reports
        }
    }`, {pageID, customTest: customTestInput})
    dispatch({
        type: CUSTOM_TEST_CREATE,
        customTest, pageID
    })
}

export const saveCustomTest = (testID: string) => async (dispatch: Func, getState: Func) => {
    const cachedTest = getState().customTests[testID]
    delete cachedTest._id
    delete cachedTest.reports
    const {customTest} = await client.mutate(`($testID: ID!, $customTest: CustomTestInput) {
        customTest: updateCustomTest(id: $testID, customTest: $customTest) {
            _id
            owner
            name
            actions {
                actionType
                values
            }
            reports
        }
    }`, {
        testID,
        customTest: cachedTest
    })

    dispatch({
        type: CUSTOM_TEST_SAVE,
        testID,
        customTest
    })
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

export const removeCustomTest = (customTestID: string) => async (dispatch: Func) => {
    const {customTest} = await client.mutate(`($customTestID: ID!) {
        customTest: removeCustomTest(id: $customTestID) {
            _id
            owner
            name
            actions {
                actionType
                values
            }
        }
    }`, {customTestID})
    dispatch({
        type: CUSTOM_TEST_REMOVE,
        customTestID
    })
}

export const executeCustomTest = (customTestID: string) => async (dispatch: Func) => {
    // Fire off event indication execution start
    dispatch({
        type: CUSTOM_TEST_EXECUTE,
        customTestID
    })
    // Start test
    const {customTest} = await client.mutate(`($id: ID!) {
        customTest: executeCustomTest(id: $id) {
            _id
        }
    }`, {id: customTestID})
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
}

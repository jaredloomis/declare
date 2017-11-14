// @flow
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    CUSTOM_TEST_UPDATE_ACTION, CUSTOM_TEST_FETCH,
    CUSTOM_TEST_ADD_ACTION, CUSTOM_TEST_REMOVE_ACTION,
    CUSTOM_TEST_CREATE, CUSTOM_TEST_SAVE, CUSTOM_TEST_UPDATE_INFO,
    CUSTOM_TEST_REMOVE
} from "./Types"

export const fetchCustomTest = (customTestID: string) => async (dispatch: Func) => {
    if(typeof customTestID !== "string") {
        customTestID = customTestID.toString()
    }
    const {customTest} = await client.query(`query ($id: ID!) {
        customTest(id: $id) {
            _id
            owner
            name
            actions {
                actionType
                values
            }
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
    const {customTest} = await client.mutate(`($testID: ID!, $customTest: CustomTestInput) {
        customTest: updateCustomTest(id: $testID, customTest: $customTest) {
            _id
            owner
            name
            actions {
                actionType
                values
            }
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

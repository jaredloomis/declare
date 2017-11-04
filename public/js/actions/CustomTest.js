// @flow
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    CUSTOM_TEST_UPDATE_ACTION, CUSTOM_TEST_FETCH
} from "./Types"

export const fetchCustomTest = (id: string) => async (dispatch: Func) => {
    const {customTest} = await client.query(`query ($id: ID!) {
        customTest(id: $id) {
            _id
            name
            actions {
                actionType
                values
            }
        }
    }`, {id})
    dispatch({
        type: CUSTOM_TEST_FETCH,
        id, customTest
    })
}

export const updateCustomTestAction = (customTestID: string,
                                       actionI: number, action: any) => ({
    type: CUSTOM_TEST_UPDATE_ACTION,
    customTestID, actionI, action
})

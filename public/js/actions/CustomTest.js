// @flow
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    CUSTOM_TEST_UPDATE_ACTION
} from "./Types"

export const fetchElement = (id: string) => async (dispatch: Func) => {
    const {element} = await client.query(`($id: ID!) {
        element(id: $id) {
            _id
            name
            selector
            inputType
        }
    }`, {id})
    dispatch({
        type: ELEMENT_FETCH,
        id, element
    })
}

export const updateCustomTestAction = (pageID: string, customTestI: number,
                                       actionI: number, action: any) => ({
    type: CUSTOM_TEST_UPDATE_ACTION,
    pageID, customTestI, actionI, action
})

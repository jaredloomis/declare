import gql from "graphql-tag"
import client from "../graphQL/Client"
import {
    TEST_RUN_FETCH, TEST_RUN_LIST, TEST_RUN_CREATE, TEST_RUN_UPDATE,
    ERROR_DISPLAY_MSG
} from "./Types"
import Fragments from "../graphQL/Fragments"

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
        return dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't fetch test run. ${error.message}`
        })
    }

    dispatch({
        type: TEST_RUN_FETCH,
        id, testRun
    })
}

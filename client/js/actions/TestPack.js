import gql     from "graphql-tag"

import {
    PACK_FETCH, PACK_LIST, ERROR_DISPLAY_MSG
} from "./Types"
import {handleError} from "./Error"
import client from "../graphQL/Client"
import Fragments from "../graphQL/Fragments"

const fragments = Fragments.testPack

export const fetchPack = id => async (dispatch, getState) => {
    const token = getState().activeToken
    dispatch({
        type: PACK_FETCH,
        id
    })
    const testPackRes = await client(token).query({
        query: gql`{
                testPack(id: "${id}") {
                    ...FullTestPack
                }
            }
        
            ${fragments.full}`
    })
    const res      = testPackRes.data.testPack
    const testPack = res.data
    const error    = res.error

    if(error) {
        return dispatch(handleError(error, "Couldn't fetch test pack."))
    }

    dispatch({
        type: PACK_FETCH,
        id,
        testPack
    })

    return testPack
}

export const listPacks = async (dispatch, getState) => {
    const token = getState().activeToken
    dispatch({
        type: PACK_LIST
    })
    const testPacksRes = await client(token).query({
        query: gql`{
                testPacks {
                    ...MinimalTestPackList
                }
            }
        
            ${fragments.minimalList}`
    })
    const res       = testPacksRes.data.testPacks
    const testPacks = res.data
    const error     = res.error

    if(error) {
        return dispatch(handleError(error, "Couldn't list test packs."))
    }
    
    dispatch({
        type: PACK_LIST,
        testPacks
    })

    return testPacks
}

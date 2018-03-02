import gql     from "graphql-tag"

import {
    PACK_FETCH, PACK_LIST, ERROR_DISPLAY_MSG
} from "./Types"

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

    dispatch({
        type: PACK_FETCH,
        id,
        testPack
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't fetch test pack. ${error.message}`
        })
    }
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
    
    dispatch({
        type: PACK_LIST,
        testPacks
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't list test packs. ${error.message}`
        })
    }
}

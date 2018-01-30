import {
    PACK_FETCH, PACK_LIST
} from "./Types"

import client from "../graphQL/Client"

export const fetchPack = id => async (dispatch, getState) => {
    const token = getState().activeToken
    dispatch({
        type: PACK_FETCH,
        id
    })
    const {testPack} = await client(token).query(`{
        testPack(id: "${id}") {
            _id
            internalID
            name
            fields
        }
    }`)
    dispatch({
        type: PACK_FETCH,
        id,
        testPack
    })
}

export const listPacks = async (dispatch, getState) => {
    const token = getState().activeToken
    dispatch({
        type: PACK_LIST
    })
    const {testPacks} = await client(token).query(`{
        testPacks {
            _id
            name
        }
    }`)
    dispatch({
        type: PACK_LIST,
        testPacks
    })
}

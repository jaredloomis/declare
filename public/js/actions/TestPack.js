import {
    PACK_FETCH, PACK_LIST
} from "./Types"

import {Lokka} from "lokka"
import {Transport} from "lokka-transport-http"

const client = new Lokka({
    transport: new Transport("/graphql")
})

export const fetchPack = id => async dispatch => {
    dispatch({
        type: PACK_FETCH,
        id
    })
    const {testPack} = await client.query(`{
        testPack(id: "${id}") {
            _id
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
    dispatch({
        type: PACK_LIST
    })
    const {testPacks} = await client.query(`{
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

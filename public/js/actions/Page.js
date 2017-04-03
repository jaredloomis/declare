import Promise from "bluebird"
import {Lokka} from "lokka"
import {Transport} from "lokka-transport-http"

import {
    PAGE_ADD_PACK, PAGE_FETCH,
    PACK_UPDATE_VALUE, PAGE_SAVE_PACK_DATA
} from "./Types"
import {fetchPack} from "./TestPack"
import client from "../graphQL/Client"

export const fetchPage = (id, fetchPacks=false) => async dispatch => {
    dispatch({
        type: PAGE_FETCH,
        id
    })
    const {page} = await client.query(`{
        page(id: "${id}") {
            _id
            name
            startURL
            testPackData {
                testPack
                values
            }
        }
    }`)
    dispatch({
        type: PAGE_FETCH,
        id,
        page
    })

    if(fetchPacks) {
        await Promise.all(page.testPackData.map(data =>
            fetchPack(data.testPack)(dispatch)
        ))
    }
}

export const savePackData = id => ({
    type: PAGE_SAVE_PACK_DATA,
    id
})

export const addPack = (pageID, packID) => ({
    type: PAGE_ADD_PACK,
    pageID,
    packID
})

export const updatePackValue = (uid, value) => ({
    type: PACK_UPDATE_VALUE,
    uid,
    value
})

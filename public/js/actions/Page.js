import Promise from "bluebird"

import {
    PAGE_ADD_PACK, PAGE_FETCH,
    PACK_UPDATE_VALUE, PAGE_SAVE_PACK_DATA,
    LINK_UPDATE, PAGE_LINKS_SAVE, PAGE_ADD_LINK
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
            links {
                destination
                navigation {
                    actionType
                    values
                }
            }
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

export const savePackData = id => async (dispatch, getState) => {
    const data = JSON.stringify(getState().pages[id].testPackData)
                     .replace(new RegExp("\"", "g"), "\\\"")
    dispatch({
        type: PAGE_SAVE_PACK_DATA,
        id
    })
    client.mutate(`{
        page: updatePackData(pageID: "${id}", data: "${data}") {
            _id
        }
    }`)
}

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

export const updateLinkAction = (pageID, linkI, actionI, actionStep) => ({
    type: LINK_UPDATE,
    pageID, linkI, actionI, actionStep
})

export const saveLinks = (pageID) => async (dispatch, getState) => {
    const links = getState().pages[pageID].links
    dispatch({
        type: PAGE_LINKS_SAVE,
        pageID
    })
    // Create requests to update each link
    // (TODO: only update links that have changed)
    const linkRequests = links.map(link => {
        const linkStr = JSON.stringify(link)
        return client.mutate(`{
            page: updateLink(pageID: "${pageID}", \
                             linkID: "${link._id}", link: ${linkStr}) {
                _id
            }
        }`)
    })
    // Send off all requests in parallel
    Promise.all(linkRequests)
}

export const addLink = (pageID, link) => async dispatch => {
    //PAGE_ADD_LINK
}

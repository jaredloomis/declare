import Promise from "bluebird"

import {
    PAGE_ADD_PACK, PAGE_FETCH,
    PACK_UPDATE_VALUE, PAGE_SAVE_PACK_DATA,
    LINK_UPDATE_ACTION, PAGE_LINKS_SAVE, PAGE_ADD_LINK,
    LINK_UPDATE_DEST, PAGE_REMOVE_PACK, LINK_REMOVE_ACTION,
    LINK_ADD_ACTION, PAGE_REMOVE_LINK, PACK_REMOVE_MANY
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
                _id
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

export const removeLink = (pageID, linkI) => ({
    type: PAGE_REMOVE_LINK,
    pageID, linkI
})

export const addPack = (pageID, packID) => ({
    type: PAGE_ADD_PACK,
    pageID,
    packID
})

export const removePack = (pageID, packID) => ({
    type: PAGE_REMOVE_PACK,
    pageID,
    packID
})

export const updatePackValue = (uid, value) => ({
    type: PACK_UPDATE_VALUE,
    uid,
    value
})

export const removePackMany = uid => ({
    type: PACK_REMOVE_MANY,
    uid
})

export const updateLinkAction = (pageID, linkI, actionI, actionStep) => ({
    type: LINK_UPDATE_ACTION,
    pageID, linkI, actionI, actionStep
})

export const addLinkAction = (pageID, linkI) => ({
    type: LINK_ADD_ACTION,
    pageID, linkI
})

export const removeLinkAction = (pageID, linkI, actionI) => ({
    type: LINK_REMOVE_ACTION,
    pageID, linkI, actionI
})

export const updateLinkDest = (pageID, linkI, dest) => ({
    type: LINK_UPDATE_DEST,
    pageID, linkI, dest
})

export const saveLinks = (pageID) => async (dispatch, getState) => {
    // Dispatch a "Save Page Links Started" action
    dispatch({
        type: PAGE_LINKS_SAVE,
        pageID
    })
    const links = getState().pages[pageID].links
    // Create requests to update each link
    // (TODO: only update links that have changed)
    const linkRequests = links.map(link => {
        const linkID = link._id
        delete link._id
        const linkStr = JSON.stringify(link)
                            .replace(new RegExp("\"", "g"), "\\\"")
        return client.mutate(`($pageID: ID!, $linkID: ID!, $link: LinkInput!){
            page: updateLink(pageID: $pageID, linkID: $linkID, link: $link) {
                links {
                    _id destination
                    navigation {
                        actionType values
                    }
                }
            }
        }`, {
            linkID,
            pageID,
            link
        })
    })
    // Send off all requests in parallel
    await Promise.all(linkRequests)
    // Dispatch a "Save Page Links Completed" action
    dispatch({
        type: PAGE_LINKS_SAVE,
        success: true,
        pageID
    })
}

export const addLink = (pageID, link) => async dispatch => {
    //PAGE_ADD_LINK
    await client.mutate(`{
        page: addLink(pageID: "${pageID}", link: "${link}") {
            _id
        }
    }`)
}

// @flow
import Promise from "bluebird"

import {
    PAGE_ADD_PACK, PAGE_FETCH,
    PACK_UPDATE_VALUE, PAGE_SAVE_PACK_DATA,
    LINK_UPDATE_ACTION, PAGE_LINKS_SAVE, PAGE_ADD_LINK,
    LINK_UPDATE_DEST, PAGE_REMOVE_PACK, LINK_REMOVE_ACTION,
    LINK_ADD_ACTION, PAGE_REMOVE_LINK, PACK_REMOVE_MANY,
    PAGE_LIST, PAGE_CREATE, PAGE_REMOVE, PACK_EXECUTE,
    REPORT_FETCH, PAGE_SET_BASELINE_SCREENSHOT
} from "./Types"
import {fetchPack} from "./TestPack"
import client from "../graphQL/Client"

import type {Func} from "../flow"

export const fetchPage = (id: string, fetchPacks: boolean=false,
                                      fetchReports: boolean=false) =>
                         async (dispatch: Func) => {
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
                reports
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
    if(fetchReports) {
        const promises = [].concat(page.testPackData.map(datum =>
            datum.reports.map(reportID =>
                fetchReport(reportID)(dispatch)
            )
        ))
        await Promise.all(promises)
    }
}

export async function listPages(dispatch: Func) {
    dispatch({
        type: PAGE_LIST
    })
    const {pages} = await client.query(`{
        pages {
            _id
            name
        }
    }`)
    dispatch({
        type: PAGE_LIST,
        pages
    })
}

export const savePackData = (id: string) =>
                            async (dispatch: Func, getState: Func) => {
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

export const removeLink = (pageID: string, linkI: number) => ({
    type: PAGE_REMOVE_LINK,
    pageID, linkI
})

export const addPack = (pageID: string, packID: string) => ({
    type: PAGE_ADD_PACK,
    pageID,
    packID
})

export const removePack = (pageID: string, packID: string) => ({
    type: PAGE_REMOVE_PACK,
    pageID,
    packID
})

export const updatePackValue = (uid: string, value: string) => ({
    type: PACK_UPDATE_VALUE,
    uid,
    value
})

export const removePackMany = (uid: string) => ({
    type: PACK_REMOVE_MANY,
    uid
})

export const updateLinkAction = (pageID: string, linkI: number,
                                 actionI: number, actionStep: any) => ({
    type: LINK_UPDATE_ACTION,
    pageID, linkI, actionI, actionStep
})

export const addLinkAction = (pageID: string, linkI: number) => ({
    type: LINK_ADD_ACTION,
    pageID, linkI
})

export const removeLinkAction = (pageID: string, linkI: number,
                                 actionI: number) => ({
    type: LINK_REMOVE_ACTION,
    pageID, linkI, actionI
})

export const updateLinkDest = (pageID: string, linkI: number,
                               dest: string) => ({
    type: LINK_UPDATE_DEST,
    pageID, linkI, dest
})

export const saveLinks = (pageID: string) =>
                   async (dispatch: Func, getState: Func) => {
    // Dispatch a "Save Page Links Started" action
    dispatch({
        type: PAGE_LINKS_SAVE,
        pageID
    })
    const links = getState().pages[pageID].links
    // Create requests to update each link
    // (TODO: only update links that have changed)
    const linkRequests = links.map(link => {
        const linkID = link._id || null
        console.log(JSON.stringify(link))
        //delete link._id
        //const linkStr = JSON.stringify(link)
        //                    .replace(new RegExp("\"", "g"), "\\\"")
        return client.mutate(`($pageID: ID!, $linkID: ID, $link: LinkInput!){
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

export const addLink = (pageID: string) => ({
    type: PAGE_ADD_LINK,
    pageID
})

export const createPage = (name: string) => async (dispatch: Func) => {
    dispatch({
        type: PAGE_CREATE,
        name
    })
    const {page} = await client.mutate(`{
        page: createPage(name: "${name}", startURL: "", testPackData: []) {
            _id
        }
    }`)
    await fetchPage(page._id)(dispatch)
}

export const removePage = (pageID: string) => async (dispatch: Func) => {
    dispatch({
        type: PAGE_REMOVE,
        pageID
    })
    const {page} = await client.mutate(`{
        page: removePage(pageID: "${pageID}") {
            _id
        }
    }`)
}

export const executePack = (pageID: string, packID: string) =>
                     async (dispatch: Func) => {
    dispatch({
        type: PACK_EXECUTE,
        pageID, packID
    })
    const {page} = await client.mutate(`{
        page: executePack(pageID: "${pageID}", packID: "${packID}") {
            _id
        }
    }`)
}

export const fetchReport = (reportID: string) => async (dispatch: Func) => {
    const {report} = await client.query(`query _($reportID: ID!){
        report(id: $reportID) {
            _id
            name
            pageID packID
            summary
            steps {
                status time message data
            }
        }
    }`, {reportID})
    dispatch({
        type: REPORT_FETCH,
        reportID,
        report
    })
}

export const setBaselineScreenshot = (pageID: string, packID: string, image: string) =>
                               async (dispatch: Func) => {
    const {page} = await client.mutate(`($pageID: ID!, $packID: ID!, $image: String!){
        page: setBaselineScreenshot(pageID: $pageID, packID: $packID, image: $image) {
            _id
        }
    }`, {pageID, packID, image})
    dispatch({
        type: PAGE_SET_BASELINE_SCREENSHOT
    })
}

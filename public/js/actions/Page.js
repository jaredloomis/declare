// @flow
import Promise from "bluebird"
import gql     from "graphql-tag"

import {
    PAGE_ADD_PACK, PAGE_FETCH,
    PACK_UPDATE_VALUE, PAGE_SAVE_PACK_DATA,
    LINK_UPDATE_ACTION, PAGE_LINKS_SAVE, PAGE_ADD_LINK,
    LINK_UPDATE_DEST, PAGE_REMOVE_PACK, LINK_REMOVE_ACTION,
    LINK_ADD_ACTION, PAGE_REMOVE_LINK, PACK_REMOVE_MANY,
    PAGE_LIST, PAGE_CREATE, PAGE_REMOVE, PACK_EXECUTE,
    REPORT_FETCH, PAGE_SET_BASELINE_SCREENSHOT,
    PAGE_UPDATE_INFO, ERROR_DISPLAY_MSG
} from "./Types"
import {fetchPack} from "./TestPack"
import client from "../graphQL/Client"

import type {Func} from "../flow"
import Fragments from "../graphQL/Fragments"

const fragments = Fragments.page

export const fetchPage = (id: string, fetchPacks: boolean=false,
                                      fetchReports: boolean=false) =>
                         async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    dispatch({
        type: PAGE_FETCH,
        id
    })

    const pageRes = await client(token).query({ 
        query: gql`query ($id: String!) {
            page(id: $id) {
                ...FullPage
            }
            }
            ${fragments.full}`,
        variables: {id}
    })
    const page = pageRes.data.page.data
    const error = pageRes.data.page.error

    if(page) {
        dispatch({
            type: PAGE_FETCH,
            id,
            page
        })
    }

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }

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

export async function listPages(dispatch: Func, getState: Func) {
    const token = getState().activeToken
    dispatch({
        type: PAGE_LIST
    })
    const pagesRes = await client(token).query({
        query: gql`{
                pages {
                    ...MinimalPageList
                }
            }
            ${fragments.minimalList}`
    })
    const pages = pagesRes.data.pages.data
    const error = pagesRes.data.pages.error

    dispatch({
        type: PAGE_LIST,
        pages
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }
}

export const updatePageInfo = (id: string, info: any) => ({
    type: PAGE_UPDATE_INFO,
    id,
    info
})

export const savePackData = (id: string) =>
                      async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const data = JSON.stringify(getState().pages[id].testPackData)
                     .replace(new RegExp("\"", "g"), "\\\"")
    dispatch({
        type: PAGE_SAVE_PACK_DATA,
        id
    })
    client(token).mutate({
        mutation: gql`{
                page: updatePackData(pageID: "${id}", data: "${data}") {
                    _id
                }
            }`,
        variables: {id, data}
    })
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
    const token = getState().activeToken
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
        delete link._id
        return client(token).mutate({
            mutation: gql`mutation ($pageID: ID!, $linkID: ID, $link: LinkInput!){
                    page: updateLink(pageID: $pageID, linkID: $linkID, link: $link) {
                        data {
                            links {
                                _id destination
                                navigation {
                                    actionType values
                                }
                            }
                        }
                    }
                }`,
            variables: {
                linkID,
                pageID,
                link
            }
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

export const createPage = (name: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    dispatch({
        type: PAGE_CREATE,
        name
    })
    const pageRes = await client(token).mutate({
        mutation: gql`{
                page: createPage(name: "${name}", startURL: "", testPackData: []) {
                    _id
                }
            }`
    })
    const page = pageRes.data.page.data
    const error = pageRes.data.page.error

    await fetchPage(page._id)(dispatch)

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }
}

export const removePage = (pageID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    dispatch({
        type: PAGE_REMOVE,
        pageID
    })
    await client(token).mutate({
        mutation: gql`{
            page: removePage(pageID: "${pageID}") {
                _id
            }
        }`
    })
}

export const executePack = (pageID: string, packID: string) =>
                     async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    dispatch({
        type: PACK_EXECUTE,
        pageID, packID
    })
    const pageRes = await client(token).mutate({
        mutation: gql`($pageID: String!, $packID: String!){
                page: executePack(pageID: $pageID, packID: $packID) {
                    _id
                }
            }`,
        variables: {pageID, packID}
    })
}

export const fetchReport = (reportID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const reportRes = await client(token).query({
        query: gql`query _($reportID: ID!){
                report(id: $reportID) {
                    ...FullReport
                }
            }
            ${Fragments.report.full}`,
        variables: {reportID}
    })
    const report = reportRes.data.report.data
    const error  = reportRes.data.report.error

    dispatch({
        type: REPORT_FETCH,
        reportID,
        report
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }
}

export const setBaselineScreenshot = (pageID: string, packID: string, image: string) =>
                               async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    await client(token).mutate({
        mutation: gql`($pageID: ID!, $packID: ID!, $image: String!){
                page: setBaselineScreenshot(pageID: $pageID, packID: $packID, image: $image) {
                    _id
                }
            }`,
        variables: {pageID, packID, image}
    })
    dispatch({
        type: PAGE_SET_BASELINE_SCREENSHOT
    })
}

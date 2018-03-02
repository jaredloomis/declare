// TODO: convert from Ramda lenses to deepSet because
// - deepSet properly handles creation of array fields
// - I'm not using ramda for anything else so would elim dep
import R from "ramda"

import {
    PAGE_ADD_PACK, PAGE_FETCH, PACK_UPDATE_VALUE,
    PACK_FETCH, PACK_LIST, PAGE_SAVE_PACK_DATA,
    LINK_UPDATE_ACTION, PAGE_LINKS_SAVE,
    LINK_UPDATE_DEST, PAGE_REMOVE_PACK, LINK_REMOVE_ACTION,
    LINK_ADD_ACTION, PAGE_REMOVE_LINK, PACK_REMOVE_MANY,
    PAGE_ADD_LINK, PAGE_LIST, PAGE_CREATE, PAGE_REMOVE,
    PACK_EXECUTE, REPORT_FETCH, ASSET_RETRIEVE, PAGE_UPDATE_INFO
} from "../actions/Types"
import {deepSet, deepGet} from "../lib/Deep"

function getCookieValue(a) {
    const b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)")
    return b ? b.pop() : null
}

const defaultState = {
    pages: {},
    testPacks: {},
    reports: {},
    inputTypes: {},
    elements: {},
    customTests: {},
    categories: {},
    tokens: {},
    accounts: {},
    activeToken: getCookieValue("declare_token"),
    error: null
}

const pagesReducer = (state=defaultState, action) => {
    // Add a Test Pack to a Page
    if(action.type === PAGE_ADD_PACK) {
        const {pageID, packID} = action
        const dataL = R.lensPath(["pages", pageID, "testPackData"])
        const datum = {testPack: packID, values: {}}
        return R.over(dataL, R.append(datum), state)
    }
    // Create a new Page
    else if(action.type === PAGE_CREATE) {
        return state
    }
    else if(action.type === PAGE_REMOVE) {
        const newPages = {}
        Object.keys(state.pages).forEach(pageID => {
            if(pageID !== action.pageID)
                newPages[pageID] = state.pages[pageID]
        })
        return Object.assign({}, state, {pages: newPages})
    }
    // Remove a Test Pack from a Page
    else if(action.type === PAGE_REMOVE_PACK) {
        const {pageID, packID} = action
        const dataPath = ["pages", pageID, "testPackData"]
        const filteredData = deepGet(dataPath, state).filter(tp =>
            tp.testPack !== packID
        )
        return deepSet(dataPath, filteredData, state)
    }
    // Add a Link to a Page
    else if(action.type === PAGE_ADD_LINK) {
        const {pageID} = action
        const linksPath = ["pages", pageID, "links"]
        const defaultLink = {destination: "", navigation: []}
        const newLinks = [...deepGet(linksPath, state), defaultLink]
        return deepSet(linksPath, newLinks, state)
    }
    // Remove a Link from a Page
    else if(action.type === PAGE_REMOVE_LINK) {
        const {pageID, linkI} = action
        const linksPath = ["pages", pageID, "links"]
        const newLinks = deepGet(linksPath, state).filter((lnk, i) =>
            i !== linkI
        )
        return deepSet(linksPath, newLinks, state)
    }
    // Fetch Page requested, received, or errored
    else if(action.type === PAGE_FETCH) {
        // Set the page value, or indicate in progress
        // TODO: Don't ever overwrite a page as inProgress if we already
        //       have it in state
        const pageL   = R.lensPath(["pages", action.id])
        const curPage = state.pages[action.id]
        const pageVal = action.page ? action.page : {inProgress: true}
        const newPage = Object.assign({}, curPage, pageVal)
        return R.set(pageL, newPage, state)
    }
    // Fetch basic info about all Pages
    else if(action.type === PAGE_LIST) {
        const {pages} = action
        if(pages) {
            return pages.reduce((st, page) => {
                const stPage = st.pages[page._id]
                const newPage = !stPage ?
                    page :
                    Object.assign({}, page, stPage)
                const newPages = Object.assign({[page._id]: newPage}, st.pages)
                const ret = Object.assign({}, st, {pages: newPages})
                return ret
            }, state)
        } else {
            return state
        }
    }
    // Save a Page's testPackData to database
    else if(action.type === PAGE_SAVE_PACK_DATA) {
        return state
    }
    // Change the value of a field of a Page's TestPack
    else if(action.type === PACK_UPDATE_VALUE) {
        const [pageID, packID, ...selector] = action.uid.split(".")
        const packIndex = (() => {
            const data = state.pages[pageID].testPackData
            for(let i = 0; i < data.length; ++i) {
                const datum = data[i]
                if(datum.testPack.toString() === packID.toString())
                    return i
            }
            return -1
        })()
        const valPath = [
            "pages", pageID, "testPackData", packIndex, "values", ...selector
        ]
        return deepSet(valPath, action.value, state)
    }
    // Fetch TestPack requested, received, or errored
    else if(action.type === PACK_FETCH) {
        // Set the testPack value, or indicate in progress
        const packL   = R.lensPath(["testPacks", action.id])
        const packVal = action.testPack ? action.testPack : {inProgress: true}
        return R.set(packL, packVal, state)
    }
    // Remove an element from a FieldMany in a Page's TestPacks
    else if(action.type === PACK_REMOVE_MANY) {
        const [pageID, packID, ...selector] = action.uid.split(".")
        const fieldIndex = parseInt(selector[selector.length-1])
        selector.splice(-1, 1)
        const packIndex = (() => {
            const data = state.pages[pageID].testPackData
            for(let i = 0; i < data.length; ++i) {
                const datum = data[i]
                if(datum.testPack.toString() === packID.toString())
                    return i
            }
            return -1
        })()
        const manyPath = [
            "pages", pageID, "testPackData", packIndex, "values", ...selector
        ]
        const newMany = deepGet(manyPath, state).filter((x, i) =>
            i !== fieldIndex
        )
        return deepSet(manyPath, newMany, state)
    }
    // Update an action step in a link
    else if(action.type === LINK_UPDATE_ACTION) {
        const {pageID, linkI, actionI, actionStep} = action
        const actionPath = [
            "pages", pageID, "links", linkI, "navigation", actionI
        ]
        return deepSet(actionPath, actionStep, state)
    }
    else if(action.type === LINK_ADD_ACTION) {
        const {pageID, linkI} = action
        const curNav = state.pages[pageID].links[linkI].navigation
        const newNav = [...curNav, {actionType: "click", values: {}}]
        const navPath = ["pages", pageID, "links", linkI, "navigation"]
        return deepSet(navPath, newNav, state)
    }
    // Remove an action step in a link
    else if(action.type === LINK_REMOVE_ACTION) {
        const {pageID, linkI, actionI} = action
        const page = state.pages[pageID]
        const newNav = page.links[linkI].navigation.filter((lnk, i) =>
            i !== actionI
        )
        const navPath = ["pages", pageID, "links", linkI, "navigation"]
        return deepSet(navPath, newNav, state)
    }
    //
    else if(action.type === LINK_UPDATE_DEST) {
        const {pageID, linkI, dest} = action
        const destPath = ["pages", pageID, "links", linkI, "destination"]
        return deepSet(destPath, dest, state)
    }
    // Fetch the name and id of every Test Pack
    else if(action.type === PACK_LIST) {
        if(action.testPacks) {
            return action.testPacks.reduce(((st, pack) =>
                !st.testPacks[pack._id] ?
                    deepSet(["testPacks", pack._id], pack, st) :
                    st
            ), state)
        } else {
            return state
        }
    }
    // Execute a TestPack
    else if(action.type === PACK_EXECUTE) {
        return state
    }
    // Page.links save
    else if(action.type === PAGE_LINKS_SAVE) {
        return state
    }
    // Set Page Info value (technically set any page field...)
    else if(action.type === PAGE_UPDATE_INFO) {
        const {id, info} = action
        const newPage = {
            ...state.pages[id],
            ...info
        }
        return {
            ...state,
            pages: {
                ...state.pages,
                [id]: newPage
            }
        }
    }
    // Report was fetched
    else if(action.type === REPORT_FETCH) {
        const {reportID, report} = action
        const reports = Object.assign(state.reports, {
            [reportID]: report
        })
        return Object.assign({}, state, {reports})
    }
    // Retrieve an asset
    else if(action.type === ASSET_RETRIEVE) {
        const {asset, key} = action
        return {
            ...state,
            assets: {
                ...state.assets,
                [key]: asset
            }
        }
    }
    else {
        return state
    }
}

export default pagesReducer

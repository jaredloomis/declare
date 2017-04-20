// TODO: convert from Ramda lenses to deepSet because
// - deepSet properly handles creation of array fields
// - I'm not using ramda for anything else so would elim dep
import R from "ramda"

import client from "../graphQL/Client"
import {
    PAGE_ADD_PACK, PAGE_FETCH, PACK_UPDATE_VALUE,
    PACK_FETCH, PACK_LIST, PAGE_SAVE_PACK_DATA,
    LINK_UPDATE_ACTION
} from "../actions/Types"
import {deepSet} from "../lib/Deep"

const pages = (state={
    pages: {},
    testPacks: {}
}, action) => {
    // Add a TestPack to a Page
    if(action.type === PAGE_ADD_PACK) {
        const testPacksL = R.lensPath(["pages", action.pageID, "testPacks"])
        return R.over(testPacksL, R.append(action.packID), state)
    }
    // Fetch Page requested, received, or errored
    else if(action.type === PAGE_FETCH) {
        // Set the page value, or indicate in progress
        const pageL   = R.lensPath(["pages", action.id])
        const pageVal = action.page ? action.page : {inProgress: true}
        return R.set(pageL, pageVal, state)
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
    // Update an action step in a link
    else if(action.type === LINK_UPDATE_ACTION) {
        const {pageID, linkI, actionI, actionStep} = action
        const actionPath = [
            "pages", pageID, "links", linkI, "navigation", actionI
        ]
        return deepSet(actionPath, actionStep, state)
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
    } else {
        return state
    }
}

export default pages

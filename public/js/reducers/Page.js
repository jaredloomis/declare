import R from "ramda"

import client from "../graphQL/Client"
import {
    PAGE_ADD_PACK, PAGE_FETCH,
    PACK_UPDATE_VALUE, PACK_FETCH,
    PAGE_SAVE_PACK_DATA
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
        const data = JSON.stringify(state.pages[action.id].testPackData)
                     .replace(new RegExp("\"", "g"), "\\\"")
        client.mutate(`{
            page: updatePackData(pageID: "${action.id}", data: "${data}") {
                _id
            }
        }`)
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
        /*
        const valueL  = R.lensPath(valPath)
        return R.set(valueL, action.value, state)
        */
        return deepSet(valPath, action.value, state)
    }
    // Fetch TestPack requested, received, or errored
    else if(action.type === PACK_FETCH) {
        // Set the testPack value, or indicate in progress
        const packL   = R.lensPath(["testPacks", action.id])
        const packVal = action.testPack ? action.testPack : {inProgress: true}
        return R.set(packL, packVal, state)
    } else {
        return state
    }
}

export default pages
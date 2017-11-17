// @flow
import {
    CUSTOM_TEST_UPDATE_ACTION, CUSTOM_TEST_FETCH,
    CUSTOM_TEST_ADD_ACTION, CUSTOM_TEST_REMOVE_ACTION,
    CUSTOM_TEST_CREATE, CUSTOM_TEST_SAVE, CUSTOM_TEST_UPDATE_INFO,
    CUSTOM_TEST_REMOVE, CUSTOM_TEST_EXECUTE
} from "../actions/Types"

export default (state: any, action: {type: string}) => {
    if(action.type === CUSTOM_TEST_UPDATE_ACTION) {
        const curTest = state.customTests[action.customTestID]
        const newTest = {
            ...curTest,
            actions: curTest.actions.map((curAction, aI) =>
                aI === action.actionI ? action.action : curAction
            )
        }

        return {
            ...state,
            customTests: {
                ...state.customTests,
                [action.customTestID]: newTest
            }
        }
    } else if(action.type === CUSTOM_TEST_FETCH) {
        return {
            ...state,
            customTests: {
                ...state.customTests,
                [action.customTestID]: action.customTest
            }
        }
    } else if(action.type === CUSTOM_TEST_ADD_ACTION) {
        const curTest = state.customTests[action.customTestID]
        const newTest = {
            ...curTest,
            actions: curTest.actions.concat([action.action])
        }

        return {
            ...state,
            customTests: {
                ...state.customTests,
                [action.customTestID]: newTest
            }
        }
    } else if(action.type === CUSTOM_TEST_REMOVE_ACTION) {
        const curTest = state.customTests[action.customTestID]
        const newTest = {
            ...curTest,
            actions: curTest.actions.filter((act, i) => i !== action.actionI)
        }
        return {
            ...state,
            customTests: {
                ...state.customTests,
                [action.customTestID]: newTest
            }
        }
    } else if(action.type === CUSTOM_TEST_CREATE) {
        const curPage = state.pages[action.pageID]
        const test = action.customTest
        return {
            ...state,
            pages: {
                ...state.pages,
                [action.pageID]: {
                    ...curPage,
                    customTests: curPage.customTests.concat([test._id])
                }
            },
            customTests: {
                ...state.customTests,
                [test._id]: test
            }
        }
    } else if(action.type === CUSTOM_TEST_SAVE) {
        return state
    } else if(action.type === CUSTOM_TEST_UPDATE_INFO) {
        const newTest = {
            ...state.customTests[action.customTestID],
            ...action.update
        }
        return {
            ...state,
            customTests: {
                ...state.customTests,
                [action.customTestID]: newTest
            }
        }
    } else if(action.type === CUSTOM_TEST_REMOVE) {
        const customTest   = state.customTests[action.customTestID]
        const oldOwnerPage = state.pages[customTest.owner]
        const newOwnerPage = {
            ...oldOwnerPage,
            customTests: oldOwnerPage.customTests.filter(tst => tst !== action.customTestID)
        }
        return {
            ...state,
            customTests: {
                ...state.customTests,
                [action.customTestID]: null
            },
            pages: {
                ...state.pages,
                [customTest.owner]: newOwnerPage
            }
        }
    } else if(action.type === CUSTOM_TEST_EXECUTE) {
        if(action.report) {
            const oldTest = state.customTests[action.customTestID]
            const newTest = {
                ...oldTest,
                reports: oldTest.reports.concat([action.report])
            }
            return {
                ...state,
                customTests: {
                    ...state.customTests,
                    [action.customTestID]: newTest
                }
            }
        } else {
            return state
        }
    } else {
        return state
    }
}

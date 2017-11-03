// @flow
import {
    CUSTOM_TEST_UPDATE_ACTION
} from "../actions/Types"

export default (state: any, action: {type: string}) => {
    if(action.type === CUSTOM_TEST_UPDATE_ACTION) {
        const curPage = state.pages[action.pageID]
        const newPage = {
            ...curPage,
            customTests: curPage.customTests.map((customTest, ctI) => {
                if(ctI === action.customTestI) {
                    return {
                        ...customTest,
                        actions: customTest.actions.map((curAction, aI) =>
                            aI === action.actionI ? action.action : curAction
                        )
                    }
                } else {
                    return customTest
                }
            })
        }

        return {
            ...state,
            pages: {
                ...state.pages,
                [action.pageID]: newPage
            }
        }
    } else {
        return state
    }
}

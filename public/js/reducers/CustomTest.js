// @flow
import {
    CUSTOM_TEST_UPDATE_ACTION, CUSTOM_TEST_FETCH
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
                [action.id]: action.customTest
            }
        }
    } else {
        return state
    }
}

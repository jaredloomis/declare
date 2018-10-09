import {
    TEST_RUN_FETCH, TEST_RUN_LIST, TEST_RUN_CREATE, TEST_RUN_UPDATE,
    TEST_RUN_EXECUTE
} from "../actions/Types"

export default (state, action) => {
    if(action.type === TEST_RUN_CREATE) {
        return {
            ...state,
            testRuns: {
                ...state.testRuns,
                [action.testRun._id]: action.testRun
            }
        }
    } else if(action.type === TEST_RUN_FETCH) {
        return {
            ...state,
            testRuns: {
                ...state.testRuns,
                [action.id]: action.testRun
            }
        }
    } else if(action.type === TEST_RUN_LIST) {
        return action.testRuns.reduce((st, newTestRun) => {
            const currentTestRun = state.testRuns[newTestRun._id]

            return {
                ...st,
                testRuns: {
                    ...st.testRuns,
                    [newTestRun._id]: {
                        ...currentTestRun,
                        ...newTestRun
                    }
                }
            }
        }, state)
    } else if(action.type === TEST_RUN_UPDATE) {
        const currentTestRun = state.testRuns[action.id]

        return {
            ...state,
            testRuns: {
                [action.id]: {
                    ...currentTestRun,
                    ...action.testRun
                }
            }
        }
    } else if(action.type === TEST_RUN_EXECUTE) {
        const currentTestRun = state.testRuns[action.id]

        return {
            ...state,
            testRuns: {
                [action.id]: {
                    ...currentTestRun,
                    ...action.testRun
                }
            }
        }
    } else {
        return state
    }
}

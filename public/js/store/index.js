import {
    createStore,
    applyMiddleware
} from "redux"

import thunk   from "redux-thunk"
import pageReducer from "../reducers/Page"

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

const store = createStoreWithMiddleware(
    pageReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store

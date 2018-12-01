import {
    createStore,
    applyMiddleware
} from "redux"

import thunk              from "redux-thunk"
import reducer            from "../reducers"
import {registerListener} from "../lib/socket"
import realtimeAction     from "../actions/realtime"

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

const store = createStoreWithMiddleware(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

// Trigger redux actions on websocket messages
registerListener(message => {
    const event = JSON.parse(message.data)
    store.dispatch(realtimeAction(event))
})

export default store

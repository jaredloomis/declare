import React from "react"
import {
    Router,
    Route,
    hashHistory
} from "react-router"

import PageContainer from "../containers/Page"
import Pages from "../containers/Pages"
import "../../style/materialize.scss"
import "../../node_modules/materialize-css/js/materialize"

const PageRoute = props => {
    return <PageContainer pageID={props.params.pageID} {...props}/>
}

const App = () => <div className="container">
    <Router history={hashHistory}>
        <Route path="/"             component={Pages}/>
        <Route path="/Page/:pageID" component={PageRoute}/>
    </Router>
</div>

App.displayName = "App"
export default App

import React from "react"
import {
    Router, Route, hashHistory
} from "react-router"

import Page from "../containers/Page"
import Pages from "../containers/Pages"
import "../../style/materialize.scss"
import "../../node_modules/materialize-css/js/materialize"
import "../../node_modules/jquery/dist/jquery.min.js"

const PageRoute = props => {
    return <Page pageID={props.params.pageID} {...props}/>
}

const App = () => <div className="container">
    <Router history={hashHistory}>
        <Route path="/"             component={Pages}/>
        <Route path="/Page/:pageID" component={PageRoute}/>
    </Router>
</div>

App.displayName = "App"
export default App

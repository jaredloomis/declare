import React, {Component} from "react"
import {
    Router,
    Route,
    hashHistory
} from "react-router"

import client from "../graphQL/Client"
import PageContainer from "../containers/Page"
import Pages from "../containers/Pages"
import "../../style/materialize.scss"
import "../../node_modules/materialize-css/js/materialize"

/*
export default () => <div className="container">
    <PageContainer pageID="58b74b85ada78d102247a58a"/>
</div>
*/


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

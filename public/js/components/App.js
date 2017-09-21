import React from "react"
import {
    Router, Route, hashHistory
} from "react-router"

import Page from "../containers/Page"
import Pages from "../containers/Pages"

import bulma from "../../style/bulma.scss"
import style from "../../style/App.scss"

const PageRoute = props => {
    return <Page pageID={props.params.pageID} {...props}/>
}

const App = () => <div className={`${bulma.container} ${style.app}`}>
    <Router history={hashHistory}>
        <Route path="/"             component={Pages}/>
        <Route path="/Page/:pageID" component={PageRoute}/>
    </Router>
</div>

App.displayName = "App"
export default App

import React from "react"
import {
    Router, Route, hashHistory
} from "react-router"

import Dashboard  from "./Dashboard"
import Page       from "../containers/Page"
import Elements   from "../containers/Elements"
import InputTypes from "../containers/InputTypes"
import Pages      from "../containers/Pages"
import Nav        from "./Nav"

import bulma from "../../style/bulma.scss"
import style from "../../style/App.scss"

const PageRoute = props => {
    return <Page pageID={props.params.pageID} {...props}/>
}

const App = () => <div>
    <Nav/>
    <section className={bulma.section}>
        <div className={`${bulma.container} ${style.app}`}>
            <Router history={hashHistory}>
                <Route path="/"             component={Dashboard}/>
                <Route path="/Pages"        component={Pages}/>
                <Route path="/Elements"     component={Elements}/>
                <Route path="/InputTypes"   component={InputTypes}/>
                <Route path="/Page/:pageID" component={PageRoute}/>
            </Router>
        </div>
    </section>
</div>

App.displayName = "App"
export default App

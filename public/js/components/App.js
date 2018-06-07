import React from "react"
import {
    Router, Route, Switch
} from "react-router"
import createHistory from "history/createHashHistory"

import Dashboard           from "./Dashboard"
import PageCategories      from "../containers/PageCategories"
import InputTypeCategories from "../containers/InputTypeCategories"
import ElementCategories   from "../containers/ElementCategories"
import Nav                 from "./Nav"
import Page                from "../containers/Page"
import Element             from "../containers/Element"
import InputType           from "../containers/InputType"
import Elements            from "../containers/Elements"
import InputTypes          from "../containers/InputTypes"
import Pages               from "../containers/Pages"
import SignIn              from "../containers/SignIn"
import SignUp              from "../containers/SignUp"
import ErrorModal          from "../containers/ErrorModal"
import ErrorBoundary       from "../containers/ErrorBoundary"
import Workspace           from "../containers/Workspace"
import ProductList         from "../containers/ProductList"
import Product             from "../containers/Product"
import TestRun             from "../containers/TestRun"
import TestRunList         from "../containers/TestRunList"

// XXX Don't remove. Applies global style rules
import style               from "../../style/App.scss"

const PageRoute = props => {
    return <Page pageID={props.match.params.pageID} {...props}/>
}
const ElementRoute = props => {
    return <Element elementID={props.match.params.elementID} {...props}/>
}
const InputTypeRoute = props => {
    return <InputType inputTypeID={props.match.params.inputTypeID} {...props}/>
}
const ProductRoute = props => {
    return <Product productID={props.match.params.productID} {...props}/>
}

const TestRunRoute = props => {
    return <TestRun testRunID={props.match.params.testRunID} {...props}/>
}

const App = () =>
    <ErrorBoundary>
        <Nav/>
            <Router history={createHistory()}>
                <Switch>
                    <Route path="/" exact        component={Dashboard}/>
                    <Route path="/Pages"         component={PageCategories}/>
                    <Route path="/PagesRaw"      component={Pages}/>
                    <Route path="/Elements"      component={ElementCategories}/>
                    <Route path="/ElementsRaw"   component={Elements}/>
                    <Route path="/InputTypes"    component={InputTypeCategories}/>
                    <Route path="/InputTypesRaw" component={InputTypes}/>
                    <Route path="/Page/:pageID"  component={PageRoute}/>
                    <Route path="/Element/:elementID" component={ElementRoute}/>
                    <Route path="/InputType/:inputTypeID" component={InputTypeRoute}/>
                    <Route path="/Workspace"     component={Workspace}/>
                    <Route path="/Products"      component={ProductList}/>
                    <Route path="/Product/:productID" component={ProductRoute}/>
                    <Route path="/SignIn"        component={SignIn}/>
                    <Route path="/SignUp"        component={SignUp}/>
                    <Route path="/TestRun/:testRunID" component={TestRunRoute}/>
                    <Route path="/TestRuns"      component={TestRunList}/>
                </Switch>
            </Router>
        <ErrorModal/>
    </ErrorBoundary>

App.displayName = "App"
export default App

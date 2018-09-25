import React from "react"
import {
    Router, Route, Switch
} from "react-router"
import createHistory from "history/createHashHistory"

import Dashboard           from "../pages/Dashboard"
import PageCategories      from "../containers/PageCategories"
import PageList            from "../pages/PageList"
import InputTypeCategories from "../containers/InputTypeCategories"
import ElementCategories   from "../containers/ElementCategories"
import Nav                 from "../containers/Nav"
import Page                from "../pages/Page"
import Element             from "../containers/Element"
import InputType           from "../containers/InputType"
import ElementList         from "../pages/ElementList"
import InputTypes          from "../containers/InputTypes"
import Pages               from "../containers/Pages"
import SignIn              from "../pages/SignIn"
import SignUp              from "../pages/SignUp"
import ErrorModal          from "../containers/ErrorModal"
import ErrorBoundary       from "../containers/ErrorBoundary"
import Workspace           from "../containers/Workspace"
import ProductList         from "../pages/ProductList"
import Product             from "../containers/Product"
import TestRun             from "../pages/TestRun"
import TestRunList         from "../pages/TestRunList"
import ReportBatch         from "../pages/ReportBatch"
import Environment         from "../pages/Environment"
import EnvironmentList     from "../pages/EnvironmentList"
import Link                from "../pages/Link"
import CustomTest          from "../pages/CustomTest"

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
const EnvironmentRoute = props => {
    return <Environment environmentID={props.match.params.environmentID} {...props}/>
}
const LinkRoute = props => {
    return <Link pageID={props.match.params.pageID}
                 linkI={parseInt(props.match.params.linkI)} {...props}/>
}
const CustomTestRoute = props => {
    return <CustomTest customTestID={props.match.params.customTestID}/>
}
const ReportBatchRoute = props =>
    <ReportBatch batchID={props.match.params.batchID}/>

const App = () =>
    <ErrorBoundary>
        <Nav/>
        <Router history={createHistory()}>
            <Switch>
                <Route path="/Page/:pageID/Link/:linkI" component={LinkRoute}/>
                <Route path="/Test/:customTestID" component={CustomTestRoute}/>

                <Route path="/" exact        component={Dashboard}/>
                <Route path="/Pages"         component={PageList}/>
                <Route path="/PagesRaw"      component={Pages}/>
                <Route path="/Elements"      component={ElementList}/>
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
                <Route path="/Environment/:environmentID" component={EnvironmentRoute}/>
                <Route path="/Environments"  component={EnvironmentList}/>
                <Route path="/ReportBatch/:batchID" component={ReportBatchRoute}/>
            </Switch>
        </Router>
        <ErrorModal/>
    </ErrorBoundary>

App.displayName = "App"
export default App

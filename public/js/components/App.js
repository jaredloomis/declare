import React, {Component} from "react"
import {
    Router, Route, Switch
} from "react-router"
import createHistory from "history/createHashHistory"

import Container           from "./base/Container"
import Section             from "./base/Section"
import Dashboard           from "./Dashboard"
import PageCategories      from "./PageCategories"
import InputTypeCategories from "./InputTypeCategories"
import ElementCategories   from "./ElementCategories"
import Nav                 from "./Nav"
import Page                from "../containers/Page"
import Elements            from "../containers/Elements"
import InputTypes          from "../containers/InputTypes"
import Pages               from "../containers/Pages"
import SignIn              from "../containers/SignIn"
import ErrorModal          from "../containers/ErrorModal"

const PageRoute = props => {
    return <Page pageID={props.match.params.pageID} {...props}/>
}

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {errors: []}
    }

    componentDidCatch(error, info) {
        console.log(error)
        this.setState(state => ({
            errors: state.errors.concat([{error, info}])
        }))
    }
  
    render() {
        return this.state.errors.length ?
            <pre>{JSON.stringify(this.state.errors, null, 2)}</pre> :
            this.props.children
    }
}

const App = () =>
    <ErrorBoundary>
        <Nav/>
        <Container>
            <Section>
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
                        <Route path="/SignIn"        component={SignIn}/>
                    </Switch>
                </Router>
            </Section>
        </Container>
        <ErrorModal/>
    </ErrorBoundary>

App.displayName = "App"
export default App

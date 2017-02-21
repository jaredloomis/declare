import React    from "react"
import {render} from "react-dom"

import {Router, Route, Link, hashHistory} from "react-router"

import App from "./components/App.js"

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
    </Router>
), document.getElementById("app"))

/*
import Vue from "vue"
import VueRouter from "vue-router"
import VueResource from "vue-resource"

// Apply Vue plugins
Vue.use(VueRouter)
Vue.use(VueResource)

// Import route components (lazily)
const Page = component("Page", "/Page")

// Define routes
const routes = [
    {path: "/Page/:id", component: Page, name: "Page"}
]

// Create the router instance and pass the "routes" option
const router = new VueRouter({
    routes
})

// Create the root instance
const app = new Vue({
    router
})
// Mount instance
app.$mount("#app")

function component(name, chunk) {
    return function(resolve) {
        System.import("../view/" + name + ".vue").then(dat => resolve(dat))
        //require.ensure([path], () => resolve(require(path)), chunk)
        //require(["../view/templates/" + name + ".vue"], resolve)
    }
}
*/

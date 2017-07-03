/* global describe, it, before, after, beforeEach */
import Promise     from "bluebird"
import {Map}       from "immutable"
import {expect}    from "chai"
import mongoose    from "mongoose"

import {development as dbConfig} from "../config/database"
import Navigator      from "../worker/executor/Navigator"
import Runner         from "../worker/executor/Runner"
import SeleniumDriver from "../worker/executor/SeleniumDriver"
import Page from "../model/Page"

describe("Navigator", () => {
    let nav, runner

    before(function() {
        // Connect mongoose
        if(!mongoose.connection.readyState) {
            mongoose.connect(`mongodb://${dbConfig.host}/${dbConfig.database}`)
            mongoose.Promise = Promise
        }
        // Set up nav and runner
        runner = new Runner(new SeleniumDriver(), "Navigator Test")
        nav = new Navigator(runner)
    })

    after(() => runner.quit())

    beforeEach(() => {
        // Give each test an example page graph
        nav.pageGraph = Map({
            main: Map({
                arts: [{
                    actionType: "click",
                    values: {element: {css: "a[href='/wiki/Portal:Arts']"}}
                }]
            }),
            arts: Map({
                main: [{
                    actionType: "click",
                    values: {element: {css: "a[href='/wiki/Main_Page']"}}
                }]
            })
        })
    })

    describe("#init", () => {
        // XXX: This is testing implementation! Remove if fails
        it("should create a valid #pageGraph", async () => {
            const graph = nav.pageGraph
            nav.pageGraph = null
            await nav.init()
            expect(nav.pageGraph).to.exist
            nav.pageGraph.forEach((edges, pageID) => {
                expect(pageID).to.be.a("string")
                expect(Map.isMap(edges)).to.equal(true)
            })
            nav.pageGraph = graph
        })
    })

    describe("#inferCurrentPage()", () => {
        /*
        it("should set #currentPage", async () => {
            nav.setPage(null)
            await nav.inferCurrentPage()
            expect(nav.getPage()).to.exist
        })
        */
    })

    describe("#navigateTo()", () => {
        it("should navigate around Wikipedia", async function() {
            this.timeout(10000)
            // Go to mainPage
            await runner.get("https://en.wikipedia.org/wiki/Main_Page")
            nav.setPage("main")

            // Navigate to arts
            await nav.navigateTo("arts")
            const atArts = await runner.exists({
                css: "a[href='/wiki/Category:Performing_arts']"
            })
            expect(atArts, "At Arts page").to.equal(true)
            // Navigate to main
            await runner.sleep(1000)
            await nav.navigateTo("main")
            const atHome = await runner.exists({
                css: "#In_the_news"
            })
            expect(atHome, "At Home page").to.equal(true)
        })
    })
})

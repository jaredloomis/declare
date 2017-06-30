/* global describe, it */
import Promise     from "bluebird"
import {Map}       from "immutable"
import {expect}    from "chai"
import mongoose    from "mongoose"

import {development as dbConfig} from "../config/database"
import Navigator   from "../worker/executor/Navigator"
import Runner      from "../worker/executor/Runner"

describe("Navigator", async () => {
    // Connect mongoose
    mongoose.connect("mongodb://" + dbConfig.host + "/" + dbConfig.database)
    // Set up nav
    const nav = new Navigator({exists: sel => Promise.resolve(true)}: Runner)
    await nav.init()

    describe("#init", () => {
        // XXX: This is testing implementation! Remove if fails
        it("should create a valid #pageGraph", () => {
            expect(nav.pageGraph).to.exist
            nav.pageGraph.forEach((edges, pageID) => {
                expect(pageID).to.be.a("string")
                expect(Map.isMap(edges)).to.equal(true)
            })
        })
    })

    describe("#inferCurrentPage()", () => {
        it("should set #currentPage", async () => {
            nav.currentNav = null
            await nav.inferCurrentPage()
            expect(nav.currentPage).to.exist
        })
    })
})

/* global describe, it, before, after, beforeEach */
import Promise     from "bluebird"
import {Map}       from "immutable"
import {expect}    from "chai"
import mongoose    from "mongoose"

import {Page} from "declare-db"
import {development as dbConfig} from "../config/database"

describe("Page", () => {
    let model

    before(async () => {
        // Connect mongoose
        if(!mongoose.connection.readyState) {
            mongoose.connect(`mongodb://${dbConfig.host}/${dbConfig.database}`)
            mongoose.Promise = Promise
        }
    })

    beforeEach(async () => {
        // Get fresh model
        model = await Page.findOne({}).exec()
    })

    describe("#setPackData", () => {
        it("shouldn't modify reports", () => {
            const data       = model.testPackData[0]
            const packID     = data.testPack.toString()
            const reportsRef = data.reports
            model.setPackData(packID, {
                x: "x",
                y: "y",
                z: "z"
            })
            expect(model.testPackData[0].reports).to.eql(reportsRef)
        })
    })
})

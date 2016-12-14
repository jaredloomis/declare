/* global describe, it */
const jsc = require("jsverify")

describe("natural numbers", () => {
    it("are greater than or equal to 0", () => {
        const property = jsc.forall("nat", (n) => {
            return n >= 0
        })

        jsc.assert(property)
    })

    it("are less than 90", () => {
        const property = jsc.forall("nat", (n) => {
            return n < 90
        })

        jsc.assert(property, { size: 100 })
    })
})

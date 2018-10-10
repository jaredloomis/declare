import mongoose            from "mongoose"

import CustomTest          from "../model/CustomTest"
import Page                from "../model/Page"
import {executeCustomTest} from "declare-executor"
import accountAuth         from "./validation/accountAuth"

export default {
    /*
     * Queries
     */

    async customTests({user}) {
        accountAuth(user, null, {validateEntity: false})
        if(user && user.isSuperAdmin()) {
            return CustomTest.find({})
        } else {
            const pages   = await Page.find({owner: user.owner})
            const testIDs = [].concat.apply([], pages.map(p => p.customTests))

            const tests = await CustomTest.find({
                "_id": {
                    $in: testIDs
                }
            })

            return tests
        }
    },

    async customTest({id}, {user}) {
        const test = await CustomTest.findById(id)
        const page = await Page.findById(test.owner)
        accountAuth(user, page)
        return test
    },

    /*
     * Mutations
     */

    async createCustomTest({pageID, customTest}) {
        const testModel = await new CustomTest(customTest).save()
        await Page.findByIdAndUpdate(pageID, {$push: {customTests: testModel._id}})
        return testModel
    },

    async updateCustomTest({id, customTest}, {user}) {
        const test = await CustomTest.findById(id)
        const page = await Page.findById(test.owner)

        accountAuth(user, page)

        await CustomTest.findByIdAndUpdate(id, customTest)
        return CustomTest.findById(id)
    },

    async removeCustomTest({id}, {user}) {
        const customTest = await CustomTest.findById(id)
        const page       = await Page.findById(customTest.owner)

        accountAuth(user, page)

        if(customTest.owner) {
            await Page.findByIdAndUpdate(customTest.owner,
                {$pull: {customTests: mongoose.Types.ObjectId(id)}}
            )
        }
        return CustomTest.findByIdAndRemove(id)
    },

    async executeCustomTest({id}, {user}) {
        const customTest  = await CustomTest.findById(id)
        const page        = await Page.findById(customTest.owner)

        accountAuth(user, page)

        try {
            const report = await executeCustomTest(customTest, {
                environment: page.defaultEnvironment
            })
        } catch(ex) {
            throw {
                message: "Failed executing test.",
                ex
            }
        }

        return customTest
    }
}

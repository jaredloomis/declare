import mongoose            from "mongoose"

import CustomTest          from "../model/CustomTest"
import Page                from "../model/Page"
import Report              from "../model/Report"
import {executeCustomTest} from "../worker/executor"

export default {
    /*
     * Queries
     */

    customTests({user}) {
        if(user && user.isSuperAdmin()) {
            return CustomTest.find({})
        } else {
            return CustomTest.find({owner: user.owner})
        }
    },

    async customTest({id}, {user}) {
        const test = await CustomTest.findById(id)
        const page       = await Page.findById(test.owner)

        // Check if test exists with id
        if(!test) {
            throw {
                message: `Custom test not found with id "${id}"`
            }
        }
        // Check if user has access
        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
            throw {
                message: "Cannot access custom tests not in your account."
            }
        }

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

        // Ensure test id is valid
        if(!test) {
            throw {
                message: "No known custom test with id."
            }
        }

        // Ensure user has permissions to modify test
        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
            throw {
                message: "You don't have permission to modify this custom test."
            }
        }

        await CustomTest.findByIdAndUpdate(id, customTest)
        return await CustomTest.findById(id)
    },

    async removeCustomTest({id}, {user}) {
        const customTest = await CustomTest.findById(id)
        const page       = await Page.findById(customTest.owner)

        // Ensure test id is valid
        if(!customTest) {
            throw {
                message: `No known custom test with id ${id}.`
            }
        }

        // Ensure user has permissions to modify test
        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
            throw {
                message: "You don't have permission to modify this custom test."
            }
        }

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

        // Ensure test id is valid
        if(!customTest) {
            throw {
                message: `No known custom test with id ${id}.`
            }
        }

        // Ensure user has permissions to execute test
        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
            throw {
                message: "You don't have permission to modify this custom test."
            }
        }

        const report      = await executeCustomTest(customTest)
        report.packID = id
        report.pageID = customTest.owner
        report.owner  = user.owner
        const reportModel = new Report(report)
        await reportModel.save()
        customTest.reports = customTest.reports.concat([reportModel._id])
        await customTest.save()
        return customTest
    }

}

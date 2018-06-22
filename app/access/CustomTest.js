import mongoose            from "mongoose"

import pubSub              from "../pubSub"
import CustomTest          from "../model/CustomTest"
import Page                from "../model/Page"
import Report              from "../model/Report"
import {executeCustomTest} from "../worker/executor"

export default {
    /*
     * Queries
     */

    async customTests({user}) {
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
                /*
            const tests = []
            for(const page of pages) {
                const chunk = await CustomTest.find({owner: page._id})
                for(const test of chunk)
                    tests.push(test)
            }
            */
            return tests
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

        // Execute test - returns report
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

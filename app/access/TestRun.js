import pubSub         from "../pubSub"
import TestRun        from "../model/TestRun"
import accountAuth    from "./validation/accountAuthValidation"

import executeTestRun from "../worker/executor/TestRun"

export default {
    /*
     * Queries
     */

    testRuns({user}) {
        if(user && user.isSuperAdmin()) {
            return TestRun.find({})
        }
        
        return TestRun.find({owner: user.owner})
    },

    async testRun({id}, {user}) {
        const testRun = await TestRun.findById(id)
        accountAuth(testRun, user, {
            entityName: "TestRun"
        })
        return testRun
    },

    /*
     * Mutations
     */

    async createTestRun({testRun}, {user}) {
        // Ensure TestRun has an owner (default to user's owner)
        if(!testRun.owner) {
            testRun.owner = user.owner
        }
        // Save TestRun to db, return
        const testRunModel = new TestRun(testRun)
        await testRunModel.save()
        return testRunModel
    },

    async updateTestRun({id, testRun}, {user}) {
        const testRunModel = await TestRun.findById(id, {owner: true})
        accountAuth(testRunModel, user, {
            entityName: "TestRun",
            operation: "update"
        })
        return TestRun.findByIdAndUpdate(id, testRun, {new: true})
    },

    async removeTestRun({id}, {user}) {
        const testRunModel = await TestRun.findById(id, {owner: true})
        accountAuth(testRunModel, user, {
            entityName: "TestRun",
            operation: "remove"
        })
        return TestRun.findByIdAndRemove(id)
    },

    async executeTestRun({id}, {user}) {
        const testRun = await TestRun.findById(id)
        accountAuth(testRun, user, {
            entityName: "TestRun",
            operation: "execute"
        })
        const reportBatch = await executeTestRun(testRun)
        testRun.reportBatches = (testRun.reportBatches || []).concat([reportBatch._id])
        await testRun.save()
        return testRun
    }
}

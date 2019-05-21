import fetch            from "node-fetch"
import {TestRun}        from "declare-db"
import accountAuth      from "./validation/accountAuth"
import {
    executeTestRun,
    config as executorConfig
} from "declare-executor"

export default {
    /*
     * Queries
     */

    testRuns({user}) {
        accountAuth(user, null, {
            entityName: "TestRun",
            validateEntity: false
        })

        if(user && user.isSuperAdmin()) {
            return TestRun.find({})
        }
        
        return TestRun.find({owner: user.owner})
    },

    async testRun({id}, {user}) {
        const testRun = await TestRun.findById(id)
        accountAuth(user, testRun, {
            entityName: "TestRun",
            validateEntity: true
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
        accountAuth(user, testRunModel, {
            entityName: "TestRun",
            operation: "update",
            validateEntity: true
        })
        return TestRun.findByIdAndUpdate(id, testRun, {new: true})
    },

    async removeTestRun({id}, {user}) {
        const testRunModel = await TestRun.findById(id, {owner: true})
        accountAuth(user, testRunModel, {
            entityName: "TestRun",
            operation: "remove",
            validateEntity: true
        })
        return TestRun.findByIdAndRemove(id)
    },

    async executeTestRun({id}, {user}) {
        const testRun = await TestRun.findById(id)
        accountAuth(user, testRun, {
            entityName: "TestRun",
            operation: "execute",
            validateEntity: true
        })

        try {
            fetch(`http://${executorConfig.uri}:${executorConfig.port}/ExecuteTestRun`, {
                method: "POST",
                body: JSON.stringify({
                    testRunID: testRun._id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch(ex) {
            console.log("ERROR INVOKING EXECUTOR", ex)
        }

        return testRun
    }
}

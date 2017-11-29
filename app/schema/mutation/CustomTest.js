import mongoose from "mongoose"
import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import logger              from "../../common/Logger"
import CustomTest          from "../../model/CustomTest"
import Page                from "../../model/Page"
import Report              from "../../model/Report"
import {executeCustomTest} from "../../worker/executor"

export default {
    createCustomTest: {
        type: CustomTest.graphQL,
        args: {
            pageID: {
                type: new GraphQLNonNull(GraphQLID)
            },
            customTest: {
                type: CustomTest.graphQLInput
            }
        },
        async resolve(parent, {pageID, customTest}) {
            const testModel = await new CustomTest(customTest).save()
            await Page.findByIdAndUpdate(pageID, {$push: {customTests: testModel._id}})
            return testModel
        }
    },
    updateCustomTest: {
        type: CustomTest.graphQL,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            customTest: {
                type: CustomTest.graphQLInput
            }
        },
        async resolve(parent, {id, customTest}) {
            await CustomTest.findByIdAndUpdate(id, customTest)
            return await CustomTest.findById(id)
        }
    },
    removeCustomTest: {
        type: CustomTest.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(object, {id}) {
            const customTest = await CustomTest.findById(id)
            if(customTest.owner) {
                await Page.findByIdAndUpdate(customTest.owner,
                    {$pull: {customTests: mongoose.Types.ObjectId(id)}}
                )
            }
            return await CustomTest.findByIdAndRemove(id)
        }
    },
    executeCustomTest: {
        type: CustomTest.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(object, {id}) {
            try {
                const customTest  = await CustomTest.findById(id)
                const report      = await executeCustomTest(customTest)
                report.packID = id
                report.pageID = customTest.owner
                const reportModel = new Report(report)
                await reportModel.save()
                customTest.reports.push(reportModel._id)
                await customTest.save()
                return customTest
            } catch(ex) {
                console.log(ex)
                logger.log("error", "Exception while executing CustomTest", ex)
                return ex
            }
        }
    }
}

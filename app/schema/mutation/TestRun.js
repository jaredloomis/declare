import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import TestRunModel  from "../../model/TestRun"
import TestRunAccess from "../../access/TestRun"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createTestRun: {
        type: CanError(TestRunModel.graphQL),
        args: {
            testRun: {
                type: new GraphQLNonNull(TestRunModel.graphQLInput)
            }
        },
        resolve(_parent, args, {state}) {
            return wrapExceptional(() =>
                TestRunAccess.createTestRun(args, {user: state.user})
            )
        }
    },
    updateTestRun: {
        type: CanError(TestRunModel.graphQL),
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            testRun: {
                type: new GraphQLNonNull(TestRunModel.graphQLInput)
            }
        },
        resolve(_parent, args, {state}) {
            return wrapExceptional(() =>
                TestRunAccess.updateTestRun(args, {user: state.user})
            )
        }
    },
    removeTestRun: {
        type: CanError(TestRunModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(object, args, {state}) {
            return wrapExceptional(() =>
                TestRunAccess.removeTestRun(args, {user: state.user})
            )
        }
    },
    executeTestRun: {
        type: CanError(TestRunModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(object, args, {state}) {
            return wrapExceptional(() =>
                TestRunAccess.executeTestRun(args, {user: state.user})
            )
        }
    }
}

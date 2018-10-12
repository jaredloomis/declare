import {GraphQLList, GraphQLID, GraphQLNonNull} from "graphql"

import {TestRun as TestRunModel}  from "declare-db"
import TestRunAccess from "../../access/TestRun"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    testRuns: {
        type: CanError(new GraphQLList(TestRunModel.graphQL), {name: "List_TestRun_CanError"}),
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                TestRunAccess.testRuns({user: state.user})
            )
        }
    },
    testRun: {
        type: CanError(TestRunModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                TestRunAccess.testRun(args, {user: state.user})
            )
        }
    }
}

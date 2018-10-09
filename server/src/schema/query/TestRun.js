import {GraphQLList, GraphQLID, GraphQLNonNull} from "graphql"

import TestRunModel  from "../../model/TestRun"
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

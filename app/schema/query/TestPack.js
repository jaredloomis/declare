import {GraphQLList, GraphQLNonNull, GraphQLID} from "graphql"

import TestPackModel  from "../../model/TestPack"
import TestPackAccess from "../../access/TestPack"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    testPacks: {
        type: CanError(new GraphQLList(TestPackModel.graphQL), {name: "List_TestPack_CanError"}),
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                TestPackAccess.testPacks({user: state.user})
            )
        }
    },
    testPack: {
        type: CanError(TestPackModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, {id}, {state}) {
            return wrapExceptional(() =>
                TestPackAccess.testPack({id}, {user: state.user})
            )
        }
    }
}

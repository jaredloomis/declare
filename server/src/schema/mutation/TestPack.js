import {
    GraphQLString, GraphQLNonNull, GraphQLID
} from "graphql"

import {Page}           from "declare-db"
import {TestPack as TestPackModel}  from "declare-db"
import TestPackAccess from "../../access/TestPack"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createTestPack: {
        type: CanError(TestPackModel.graphQL),
        args: {
            name: {
                name: "name",
                type: new GraphQLNonNull(GraphQLString)
            },
            fields: {
                name: "fields",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                TestPackAccess.createTestPack(args, {user: state.user})
            )
        }
    },
    setBaselineScreenshot: {
        type: Page.graphQL,
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            },
            packID: {
                name: "packID",
                type: new GraphQLNonNull(GraphQLID)
            },
            image: {
                name: "image",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                TestPackAccess.setBaselineScreenshot(args, {user: state.user})
            )
        }
    }
}

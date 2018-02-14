import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import CustomTestModel     from "../../model/CustomTest"
import CustomTestAccess    from "../../access/CustomTest"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createCustomTest: {
        type: CanError(CustomTestModel.graphQL),
        args: {
            pageID: {
                type: new GraphQLNonNull(GraphQLID)
            },
            customTest: {
                type: CustomTestModel.graphQLInput
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                CustomTestAccess.createCustomTest(args, {user: state.user})
            )
        }
    },
    updateCustomTest: {
        type: CanError(CustomTestModel.graphQL),
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            customTest: {
                type: CustomTestModel.graphQLInput
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                CustomTestAccess.updateCustomTest(args, {user: state.user})
            )
        }
    },
    removeCustomTest: {
        type: CanError(CustomTestModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(object, args, {state}) {
            return wrapExceptional(() =>
                CustomTestAccess.updateCustomTest(args, {user: state.user})
            )
        }
    },
    executeCustomTest: {
        type: CanError(CustomTestModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(object, args, {state}) {
            return wrapExceptional(() =>
                CustomTestAccess.updateCustomTest(args, {user: state.user})
            )
        }
    }
}

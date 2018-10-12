import {
    GraphQLNonNull, GraphQLID
} from "graphql"

import {InputType as InputTypeModel}  from "declare-db"
import InputTypeAccess from "../../access/InputType"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createInputType: {
        type: CanError(InputTypeModel.graphQL),
        args: {
            inputType: {
                name: "inputType",
                type: InputTypeModel.graphQLInput
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                InputTypeAccess.createInputType(args, {user: state.user})
            )
        }
    },
    updateInputType: {
        type: CanError(InputTypeModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            },
            inputType: {
                name: "inputType",
                type: InputTypeModel.graphQLInput
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                InputTypeAccess.updateInputType(args, {user: state.user})
            )
        }
    },
    removeInputType: {
        type: CanError(InputTypeModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(object, args, {state}) {
            return wrapExceptional(() =>
                InputTypeAccess.removeInputType(args, {user: state.user})
            )
        }
    }
}

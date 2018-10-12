import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import {Element as ElementModel}  from "declare-db"
import ElementAccess from "../../access/Element"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createElement: {
        type: CanError(ElementModel.graphQL),
        args: {
            element: {
                type: ElementModel.graphQLInput
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                ElementAccess.createElement(args, {user: state.user})
            )
        }
    },
    updateElement: {
        type: CanError(ElementModel.graphQL),
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            element: {
                type: ElementModel.graphQLInput
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                ElementAccess.updateElement(args, {user: state.user})
            )
        }
    },
    removeElement: {
        type: CanError(ElementModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(object, args, {state}) {
            return wrapExceptional(() =>
                ElementAccess.removeElement(args, {user: state.user})
            )
        }
    }
}

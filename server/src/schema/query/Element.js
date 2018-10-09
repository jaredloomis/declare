import {
    GraphQLID, GraphQLNonNull, GraphQLList
} from "graphql"

import ElementModel  from "../../model/Element"
import ElementAccess from "../../access/Element"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    elements: {
        type: CanError(new GraphQLList(ElementModel.graphQL), {name: "List_Element_CanError"}),
        resolve(parent, args, {state}) {
            return wrapExceptional(() => ElementAccess.elements({user: state.user}))
        }
    },
    element: {
        type: CanError(ElementModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, {id}, {state}) {
            return wrapExceptional(() => ElementAccess.element({id}, {user: state.user}))
        }
    }
}

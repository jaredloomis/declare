import {GraphQLList, GraphQLID, GraphQLNonNull} from "graphql"

import {InputType as InputTypeModel}  from "declare-db"
import InputTypeAccess from "../../access/InputType"
import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    inputTypes: {
        type: CanError(new GraphQLList(InputTypeModel.graphQL), {name: "List_InputType_CanError"}),
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                InputTypeAccess.inputTypes({user: state.user})
            )
        }
    },
    inputType: {
        type: CanError(InputTypeModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, {id}, {state}) {
            return wrapExceptional(() =>
                InputTypeAccess.inputType({id}, {user: state.user})
            )
        }
    }
}

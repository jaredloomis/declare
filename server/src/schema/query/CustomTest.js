import {
    GraphQLID, GraphQLNonNull, GraphQLList
} from "graphql"

import {CustomTest as CustomTestModel} from "declare-db"
import CustomTestAccess from "../../access/CustomTest"
import CanError         from "../GraphQLCanError"

export default {
    customTests: {
        type: CanError(new GraphQLList(CustomTestModel.graphQL), {name: "List_CustomTest_CanError"}),
        async resolve(parent, args, {state}) {
            try {
                return {
                    data: await CustomTestAccess.customTests({user: state.user})
                }
            } catch(ex) {
                return {error: ex}
            }
        }
    },
    customTest: {
        type: CanError(CustomTestModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, {id}, {state}) {
            try {
                return {
                    data: await CustomTestAccess.customTest({id}, {user: state.user})
                }
            } catch(ex) {
                return {error: ex}
            }
        }
    }
}

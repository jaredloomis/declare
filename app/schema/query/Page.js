import {
    GraphQLList, GraphQLString, GraphQLNonNull
} from "graphql"

import PageModel  from "../../model/Page"
import PageAccess from "../../access/Page"
import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    pages: {
        type: CanError(new GraphQLList(PageModel.graphQL), {name: "List_Page_CanError"}),
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                PageAccess.pages({user: state.user})
            )
        }
    },
    page: {
        type: CanError(PageModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(parent, {id}, {state}) {
            return wrapExceptional(() =>
                PageAccess.page({id}, {user: state.user})
            )
        }
    }
}

import {
    GraphQLList, GraphQLString, GraphQLNonNull
} from "graphql"

import Page from "../../model/Page"

export default {
    /* Page Queries */
    pages: {
        type: new GraphQLList(Page.graphQL),
        async resolve() {
            return await Page.find({})
        }
    },
    page: {
        type: Page.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(parent, args) {
            return await Page.findById(args.id)
        }
    }
}

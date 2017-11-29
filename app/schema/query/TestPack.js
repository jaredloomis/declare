import {GraphQLList, GraphQLNonNull, GraphQLID} from "graphql"

import TestPack from "../../model/TestPack"

export default {
    testPacks: {
        type: new GraphQLList(TestPack.graphQL),
        async resolve() {
            return await TestPack.find({})
        }
    },
    testPack: {
        type: TestPack.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, args) {
            return await TestPack.findById(args.id)
        }
    }
}

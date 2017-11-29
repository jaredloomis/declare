import {
    GraphQLString, GraphQLNonNull
} from "graphql"

import {getFile} from "../../worker/executor/AssetStorage"

export default {
    asset: {
        type: GraphQLString,
        args: {
            key: {
                name: "key",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(parent, {key}) {
            const binary = await getFile(key)
            return new Buffer(binary, "binary").toString("base64")
        }
    }
}

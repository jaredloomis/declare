import {
    GraphQLString, GraphQLNonNull
} from "graphql"

import {retrieveAsset, getAssetURL} from "../../access/Asset"

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
            const binary = await retrieveAsset(key)
            return new Buffer(binary, "binary").toString("base64")
        }
    },
    assetURL: {
        type: GraphQLString,
        args: {
            key: {
                name: "key",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(parent, {key}) {
            return getAssetURL(key)
        }
    }
}

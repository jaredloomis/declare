import {
    GraphQLString, GraphQLNonNull, GraphQLID
} from "graphql"

import Page          from "../../model/Page"
import TestPack      from "../../model/TestPack"
import {internalIDs} from "../../config/TestPack"

export default {
    createTestPack: {
        type: TestPack.graphQL,
        args: {
            name: {
                name: "name",
                type: new GraphQLNonNull(GraphQLString)
            },
            fields: {
                name: "fields",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(parent, args) {
            args.fields = JSON.parse(args.fields)
            return await new TestPack(args).save()
        }
    },
    setBaselineScreenshot: {
        type: Page.graphQL,
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            },
            packID: {
                name: "packID",
                type: new GraphQLNonNull(GraphQLID)
            },
            image: {
                name: "image",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(parent, {pageID, packID, image}) {
            const page = await Page.findOne({_id: pageID})
            page.setPackDatum(packID, "baselineScreenshot", image)
            await page.save()
            return page
        }
    }
}

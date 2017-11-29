import {GraphQLList, GraphQLID, GraphQLNonNull} from "graphql"

import Report from "../../model/Report"

export default {
    reports: {
        type: new GraphQLList(Report.graphQL),
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, {pageID}) {
            return await Report.find({pageID}).sort({startTime: 1})
        }
    },
    report: {
        type: Report.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, {id}) {
            return await Report.findById(id)
        }
    }
}

import {GraphQLList, GraphQLNonNull, GraphQLID} from "graphql"
import WebSocket from "ws"

import Report from "../../model/Report"

/*
const wss = new WebSocket.Server({
    port: 3000
})

export default {
    reports: {
        type: new GraphQLList(Report.graphQL),
        async resolve() {
            return await Page.find({})
        }
    }
}
*/
export default {}

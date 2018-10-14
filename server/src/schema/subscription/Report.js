import {GraphQLList}    from "graphql"
import {Report, pubSub} from "declare-db"
import CanError         from "../GraphQLCanError"

export default {
    reports: {
        type: CanError(new GraphQLList(Report.graphQL), {name: "List_Report_CanError"}),
        subscribe: function*() {
            const t = true
            while(t) {
                yield pubSub.then(({sub}) =>
                    new Promise((resolve, reject) =>
                        sub.once("data", resolve)
                    )
                )
            }
        }
    }
}

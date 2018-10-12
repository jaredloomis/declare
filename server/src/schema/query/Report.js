import {GraphQLList, GraphQLID, GraphQLNonNull} from "graphql"

import {Report as ReportModel}  from "declare-db"
import ReportAccess from "../../access/Report"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    reports: {
        type: CanError(new GraphQLList(ReportModel.graphQL), {name: "List_Report_CanError"}),
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, {pageID}, {state}) {
            return wrapExceptional(() =>
                ReportAccess.reports({pageID}, {user: state.user})
            )
        }
    },
    report: {
        type: CanError(ReportModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, {id}, {state}) {
            return wrapExceptional(() =>
                ReportAccess.report({id}, {user: state.user})
            )
        }
    }
}

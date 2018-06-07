import {GraphQLID, GraphQLNonNull} from "graphql"

import ReportBatchModel  from "../../model/ReportBatch"
import ReportBatchAccess from "../../access/ReportBatch"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    reportBatch: {
        type: CanError(ReportBatchModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                ReportBatchAccess.reportBatch(args, {user: state.user})
            )
        }
    }
}

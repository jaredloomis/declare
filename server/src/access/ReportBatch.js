import {ReportBatch} from "declare-db"
import accountAuth from "./validation/accountAuth"

export default {
    /*
     * Queries
     */

    async reportBatch({id}, {user}) {
        const reportBatch = await ReportBatch.findById(id)
        accountAuth(user, reportBatch, {
            entityName: "ReportBatch"
        })
        return reportBatch
    }

    /*
     * Mutations
     */
}

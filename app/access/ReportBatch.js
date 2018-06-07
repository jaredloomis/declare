import ReportBatch from "../model/ReportBatch"
import accountAuth from "./validation/accountAuthValidation"

export default {
    /*
     * Queries
     */

    async reportBatch({id}, {user}) {
        const reportBatch = await ReportBatch.findById(id)
        accountAuth(reportBatch, user, {
            entityName: "ReportBatch"
        })
        return reportBatch
    }

    /*
     * Mutations
     */
}

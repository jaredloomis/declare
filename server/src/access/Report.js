import {Report}      from "declare-db"
import accountAuth from "./validation/accountAuth"

export default {
    reports({pageID}, {user}) {
        accountAuth(user, null, {validateEntity: false})
        // Check if user has access
        if(!user || !user.isSuperAdmin()) {
            throw {
                message: "Must be a super admin to access all reports."
            }
        }
        
        return Report.find({pageID}).sort({startTime: 1})
    },

    async report({id}, {user}) {
        const rep = await Report.findById(id)
        accountAuth(user, rep)
        return rep
    }
}

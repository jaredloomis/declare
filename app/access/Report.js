import Report from "../model/Report"

export default {
    reports({pageID}, {user}) {
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

        // Check if report exists with id
        if(!rep) {
            throw {
                message: `Report not found with id \"${id}\"`
            }
        }
        // Check if user has access
        if(!user || rep.owner !== user.owner && !user.isSuperAdmin()) {
            throw {
                message: "Cannot access reports not in your account."
            }
        }

        return rep
    }
}

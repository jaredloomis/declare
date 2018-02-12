import CustomTest from "../model/CustomTest"

export default {
    customTests({user}) {
        if(user && user.isSuperAdmin()) {
            return CustomTest.find({})
        } else {
            throw {
                message: "Must be a super admin to access all custom tests."
            }
        }
    },

    async customTest({id}, {user}) {
        const cat = await CustomTest.findById(id)

        // Check if test exists with id
        if(!cat) {
            throw {
                message: `Custom test not found with id \"${id}\"`
            }
        }
        // Check if user has access
        if(!user || cat.owner !== user.owner && !user.isSuperAdmin()) {
            throw {
                message: "Cannot access custom tests not in your account."
            }
        }

        return cat
    }
}

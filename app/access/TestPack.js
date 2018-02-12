import TestPack from "../model/TestPack"

export default {
    testPacks({user}) {
        // Check if user has access
        if(!user || !user.isSuperAdmin()) {
            throw {
                message: "Must be a super admin to access all test packs."
            }
        }
        
        return TestPack.find({})
    },

    async testPack({id}, {user}) {
        const pack = await TestPack.findById(id)

        // Check if test pack exists with id
        if(!pack) {
            throw {
                message: `TestPack not found with id \"${id}\"`
            }
        }
        // Check if user has access
        if(!user || pack.owner !== user.owner && !user.isSuperAdmin()) {
            throw {
                message: "Cannot access test packs not in your account."
            }
        }

        return pack
    }
}

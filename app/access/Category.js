import Category from "../model/Category"

export default {
    categories({user}) {
        if(user && user.isSuperAdmin()) {
            return Category.find({})
        } else {
            throw {
                message: "Must be a super admin to access all categories."
            }
        }
    },

    async category({id}, {user}) {
        const cat = await Category.findById(id)
        if(user && cat && cat.owner === user.owner) {
            return cat
        } else {
            throw {
                message: "Cannot access categories not in your account."
            }
        }
    }
}

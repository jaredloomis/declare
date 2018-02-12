import Page from "../model/Page"

export default {
    pages({user}) {
        // Check if user has access
        if(!user || !user.isSuperAdmin()) {
            throw {
                message: "Must be a super admin to access all pages."
            }
        }
        
        return Page.find({})
    },

    async page({id}, {user}) {
        const ty = await Page.findById(id)

        // Check if page exists with id
        if(!ty) {
            throw {
                message: `Page not found with id \"${id}\"`
            }
        }
        // Check if user has access
        if(!user || ty.owner !== user.owner && !user.isSuperAdmin()) {
            throw {
                message: "Cannot access input types not in your account."
            }
        }

        return ty
    }
}

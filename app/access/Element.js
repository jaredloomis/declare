import Element from "../model/Element"

export default {
    elements({user}) {
        // Check if user has access
        if(!user || !user.isSuperAdmin()) {
            throw {
                message: "Must be a super admin to access all elements."
            }
        }
        
        return Element.find({})
    },

    async element({id}, {user}) {
        const elem = await Element.findById(id)

        // Check if element exists with id
        if(!elem) {
            throw {
                message: `Element not found with id \"${id}\"`
            }
        }
        // Check if user has access
        if(!user || elem.owner !== user.owner && !user.isSuperAdmin()) {
            throw {
                message: "Cannot access elements not in your account."
            }
        }

        return elem
    }
}

import Element from "../model/Element"

export default {
    /*
     * Queries
     */

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
    },

    /*
     * Mutations
     */

    createElement({element}) {
        return new Element(element).save()
    },

    async updateElement({id, element}, {user}) {
        const elementModel = await Element.findById(id)

        if(!user || user.owner !== elementModel.owner) {
            throw {
                message: "You don't have permission to modify this element."
            }
        }

        await elementModel.update(element)
        return await Element.findById(id)
    },

    async removeElement({id}, {user}) {
        const elementModel = await Element.findById(id)

        if(!user || user.owner !== elementModel.owner) {
            throw {
                message: "You don't have permission to modify this element."
            }
        }

        await elementModel.remove()
        return elementModel
    }
}

import {Element}     from "declare-db"
import accountAuth from "./validation/accountAuth"

export default {
    /*
     * Queries
     */

    elements({user}) {
        // Check if user has access
        accountAuth(user, null, {validateEntity: false})
        
        if(user.isSuperAdmin()) {
            return Element.find({})
        } else {
            return Element.find({
                owner: user.owner
            })
        }
    },

    async element({id}, {user}) {
        const elem = await Element.findById(id)
        accountAuth(user, elem)
        return elem
    },

    /*
     * Mutations
     */

    createElement({element}, {user}) {
        accountAuth(user, null, {validateEntity: false})
        element.owner = element.owner || user.owner
        return new Element(element).save()
    },

    async updateElement({id, element}, {user}) {
        const elementModel = await Element.findById(id)
        accountAuth(user, elementModel)
        await elementModel.update(element)
        return await Element.findById(id)
    },

    async removeElement({id}, {user}) {
        const elementModel = await Element.findById(id)
        accountAuth(user, elementModel)
        await elementModel.remove()
        return elementModel
    }
}

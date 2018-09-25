import InputType   from "../model/InputType"
import accountAuth from "./validation/accountAuth"

export default {
    /*
     * Queries
     */

    inputTypes({user}) {
        accountAuth(user, null, {validateEntity: false})

        // Check if user has access
        if(user.isSuperAdmin()) {
            return InputType.find({})
        } else {
            return InputType.find({owner: user.owner})
        }
    },

    async inputType({id}, {user}) {
        const ty = await InputType.findById(id)
        accountAuth(user, ty)
        return ty
    },

    /*
     * Mutations
     */

    createInputType({inputType}, {user}) {
        accountAuth(user, null, {validateEntity: false})

        inputType.owner = inputType.owner || user.owner

        return new InputType(inputType).save()
    },

    async updateInputType({id, inputType}, {user}) {
        const ty = await InputType.findById(id)
        accountAuth(user, ty)
        await InputType.findByIdAndUpdate(id, inputType)
        return InputType.findById(id)
    },

    async removeInputType({id}, {user}) {
        const ty = await InputType.findById(id)
        accountAuth(user, ty)
        ty.remove()
        return ty
    }
}

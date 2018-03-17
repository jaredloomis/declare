import InputType from "../model/InputType"

export default {
    /*
     * Queries
     */

    inputTypes({user}) {
        if(!user) {
            throw {
                message: "You don't have permission to access input types."
            }
        }

        // Check if user has access
        if(user.isSuperAdmin()) {
            return InputType.find({})
        } else {
            return InputType.find({owner: user.owner})
        }
    },

    async inputType({id}, {user}) {
        const ty = await InputType.findById(id)

        // Check if input type exists with id
        if(!ty) {
            throw {
                message: `Input type not found with id \"${id}\"`
            }
        }
        // Check if user has access
        if(!(user && (user.owner.equals(ty.owner) || user.isSuperAdmin()))) {
            throw {
                message: "Cannot access input types not in your account."
            }
        }

        return ty
    },

    /*
     * Mutations
     */

    createInputType({inputType}, {user}) {
        inputType.owner = inputType.owner || user.owner

        return new InputType(inputType).save()
    },

    async updateInputType({id, inputType}, {user}) {
        const ty = await InputType.findById(id)

        // Check if user has access
        if(!(user && (user.owner.equals(ty.owner) || user.isSuperAdmin()))) {
            throw {
                message: "Cannot access input types not in your account."
            }
        }

        await InputType.findByIdAndUpdate(id, inputType)
        return InputType.findById(id)
    },

    async removeInputType({id}, {user}) {
        const ty = await InputType.findById(id)

        // Check if user has access
        if(!(user && (user.owner.equals(ty.owner) || user.isSuperAdmin()))) {
            throw {
                message: "Cannot access input types not in your account."
            }
        }

        ty.remove()
        return ty
    }
}

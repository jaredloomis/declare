import InputType from "../model/InputType"

export default {
    /*
     * Queries
     */

    inputTypes({user}) {
        // Check if user has access
        if(!user || !user.isSuperAdmin()) {
            throw {
                message: "Must be a super admin to access all input types."
            }
        }
        
        return InputType.find({})
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
        if(!user || ty.owner !== user.owner && !user.isSuperAdmin()) {
            throw {
                message: "Cannot access input types not in your account."
            }
        }

        return ty
    },

    /*
     * Mutations
     */

    createInputType({inputType}) {
        return new InputType(inputType).save()
    },

    async updateInputType({id, inputType}, {user}) {
        const ty = await InputType.findById(id)

        // Check if user has access
        if(!user || ty.owner !== user.owner && !user.isSuperAdmin()) {
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
        if(!user || ty.owner !== user.owner && !user.isSuperAdmin()) {
            throw {
                message: "Cannot access input types not in your account."
            }
        }

        ty.remove()
        return ty
    }
}

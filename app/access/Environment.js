import Environment from "../model/Environment"
import accountAuth from "./validation/accountAuthValidation"

export default {
    /*
     * Queries
     */

    environments({user}) {
        if(!user) {
            throw {
                message: "You don't have permission to access environments."
            }
        }
        
        if(user.isSuperAdmin()) {
            return Environment.find({})
        } else {
            return Environment.find({
                owner: user.owner
            })
        }
    },

    async environment({id}, {user}) {
        const env = await Environment.findById(id)
        accountAuth(env, user, {
            entityName: "Environment"
        })
        return env
    },

    /*
     * Mutations
     */

    createEnvironment({environment}, {user}) {
        environment.owner = environment.owner || user.owner
        return new Environment(environment).save()
    },

    async updateEnvironment({id, environment}, {user}) {
        const environmentModel = await Environment.findById(id)
        accountAuth(environmentModel, user, {
            entityName: "Environment"
        })
        await environmentModel.update(environment)
        return await Environment.findById(id)
    },

    async removeEnvironment({id}, {user}) {
        const environmentModel = await Environment.findById(id)
        accountAuth(environmentModel, user, {
            entityName: "Environment"
        })
        await environmentModel.remove()
        return environmentModel
    }
}

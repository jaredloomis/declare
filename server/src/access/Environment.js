import Environment from "../model/Environment"
import accountAuth from "./validation/accountAuth"

export default {
    /*
     * Queries
     */

    environments({user}) {
        accountAuth(user, null, {validateEntity: false})
        
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
        accountAuth(user, env, {
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
        accountAuth(user, environmentModel, {
            entityName: "Environment"
        })
        await environmentModel.update(environment)
        return await Environment.findById(id)
    },

    async removeEnvironment({id}, {user}) {
        const environmentModel = await Environment.findById(id)
        accountAuth(user, environmentModel, {
            entityName: "Environment"
        })
        await environmentModel.remove()
        return environmentModel
    }
}

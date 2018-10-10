//import {Error} from "declare-common"
const {ErrorType} = require("declare-common").Error//Error

const defaultOptions = {
    validateEntity: true,
    entityName: "entity",
    entitiesName: "entities",
    operation: "access"
}

/**
 * Given a user and a db entity, validate that:
 * - User exists (is logged in)
 * - User and entity both belong to same account,
 *   if applicable
 */
export default (user, entity, options=defaultOptions) => {
    const entityName   =
        options.entityName   || "entity"
    const entitiesName =
        options.entitiesName || `${entityName}s` || "entities"
    const operation    =
        options.operation    || "access"

    if(!user) {
        throw {
            type: ErrorType.NotLoggedIn,
            message: options.nullUser ||
                     `Must be signed in to ${operation} this ${entityName}.`
        }
    }

    if(options.validateEntity !== false && !entity) {
        throw {
            message: `${entityName} does not exist.`
        }
    }
    
    if(entity) {
        if(entity.owner && !(user.owner.equals(entity.owner) || user.isSuperAdmin())) {
            throw {
                message: `Cannot ${operation} ${entitiesName} not in your account.`
            }
        }
    }
}

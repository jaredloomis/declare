/**
 * Given a user and a db entity, validate that:
 * - User and entity exist (non-null)
 * - User and entity both belong to same account
 */
export default (entity, user, options) => {
    const entityName   =
        options.entityName   || "entity"
    const entitiesName =
        options.entitiesName || `${options.entityName}s` || "entities"
    const operation    =
        options.operation || "access"

    if(!user) {
        throw {
            message: options.nullUser ||
                     `Must be signed in to ${operation} this ${entityName}.`
        }
    }

    if(!entity) {
        throw {
            message: options.nullEntity ||
                     `Specified ${entityName} not found.`
        }
    }

    if(!user.owner && !user.isSuperAdmin()) {
        throw {
            message: "User is not associated with an account."
        }
    }

    if(!entity.owner) {
        throw {
            message: `Specified ${entityName} is not associated with an account.`
        }
    }
    
    if(!(user.owner.equals(entity.owner) || user.isSuperAdmin())) {
        throw {
            message: options.notAuthorized ||
                     `Cannot ${operation} ${entitiesName} not in your account.`
        }
    }
}

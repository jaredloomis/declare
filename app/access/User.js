import User    from "../model/User"
import Account from "../model/Account"

export default {
    /*
     * Queries
     */

    users({user}) {
        if(user && user.isSuperAdmin()) {
            return User.find({})
        } else {
            throw {
                message: "Must be a super admin to access all users."
            }
        }
    },

    async user({id}, {user}) {
        // Find any accounts requested user and requesting user have in common
        const account    = await Account.containingUser(id)
        const commonAcct = account && account.containsUser(id)
        // If they share an account, let 'em in, otherwise error
        // TODO per-user permissions in account
        if(commonAcct || (user && user.isSuperAdmin())) {
            return User.findById(id)
        } else {
            throw {
                message: "You don't have permission to access this user."
            }
        }
    },

    /*
     * Mutations
     */

    createUser({user}) {
        // Validate user
        // TODO: real validation
        if(!user) {
            throw {
                message: "User is not valid."
            }
        }

        return new User(user).save()
    },

    async updateUser({id, user}, state) {
        // Ensure user is in account
        const acct      = await Account.containingUser(user._id)
        const matchAcct = acct && acct.containsUser(state.user._id)
        if(!user || (!matchAcct && (user && user.isSuperAdmin && !user.isSuperAdmin()))) {
            throw {
                message: "You don't have permission to modify this user."
            }
        }

        return User.findByIdAndUpdate(id, user)
    },

    async removeUser({id}, {user}) {
        // Ensure requesting user is in same account as id
        const acct      = await Account.containingUser(id)
        const matchAcct = acct && acct.containsUser(user._id)
        if(!user || (!matchAcct && !user.isSuperAdmin())) {
            throw {
                message: "You don't have permission to modify this user."
            }
        }

        return User.findByIdAndRemove(id)
    }
}

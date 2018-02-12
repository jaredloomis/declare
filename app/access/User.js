import User    from "../model/User"
import Account from "../model/Account"

export default {
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
        // Find user
        const foundUser   = await User.findById(id)
        // Find any accounts requested user and requesting user have in common
        const accounts    = await Account.containingUser(id)
        const commonAccts = accounts.filter(acct => acct.containsUser(foundUser))
        // If they share an account, let 'em in, otherwise error
        // TODO per-user permissions in account
        if(commonAccts.length || user.isSuperAdmin()) {
            return foundUser
        } else {
            throw {
                message: "You don't have permission to access this user."
            }
        }
    }
}

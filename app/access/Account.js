import Account from "../model/Account"

export default {
    accounts({user}) {
        if(user && user.isSuperAdmin()) {
            return Account.find({})
        } else {
            throw {
                message: "Must be a super admin to access all accounts."
            }
        }
    },

    async account({id}, {user}) {
        // TODO check if user is in account
        const account = await Account.findById(id)

        if(user && account.containsUser(user._id)) {
            return account
        } else {
            throw {
                message: "You cannot access this account."
            }
        }
    }
}

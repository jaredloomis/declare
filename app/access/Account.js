import Account  from "../model/Account"
import User     from "../model/User"
import Category from "../model/Category"

export default {
    /*
     * Queries
     */

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
    },

    /*
     * Mutations
     */

    createAccount({account}) {
        // Validate account
        // TODO: Just checking it exists
        if(!account) {
            throw {
                message: "Account is not valid."
            }
        }

        return new Account(account).save()
    },

    async updateAccount({id, account}, {user}) {
        // Ensure user is in account
        // TODO make sure is admin
        const acct = await Account.findById(id)
        if(!(user && (user.owner.equals(acct._id) || user.isSuperAdmin()))) {
            throw {
                message: "You don't have access to this account."
            }
        }

        return Account.findByIdAndUpdate(id, account)
    },

    async removeAccount({id}, {user}) {
        // Ensure user is in account
        // TODO make sure is admin
        const acct = await Account.findById(id)
        if(!(user && (user.owner.equals(acct._id) || user.isSuperAdmin()))) {
            throw {
                message: "You don't have access to this account."
            }
        }

        return await Account.findByIdAndRemove(id)
    },

    // Assign a User to an Account
    async assignUser({accountID, userID}, {user}) {
        // Ensure user doesn't already have account
        // TODO make sure is admin
        const alreadyAcct = await Account.containingUser(userID)
        if(alreadyAcct) {
            throw {
                message: "User is already assigned to an account."
            }
        }

        // Ensure user making request is in account
        // TODO make sure is admin
        const acct      = await Account.containingUser(user._id)
        const matchAcct = acct && acct._id === accountID
        if(!user || (!matchAcct && !user.isSuperAdmin())) {
            throw {
                message: "You don't have access to this account."
            }
        }

        // Set user's owner
        await User.findByIdAndUpdate(userID, {
            $set: {owner: accountID}
        })

        // Add user ID to account's users list
        return await Account.findByIdAndUpdate(
            accountID,
            {$addToSet: {users: userID}}
        )
    },

    async addRootCategory({categoryID, itemRef}, {user}) {
        if(!itemRef) {
            itemRef = (await Category.findById(categoryID)).itemRef
        }
        itemRef = itemRef.toLowerCase()

        // Compute name of field we want to modify (ex. "pageCategories")
        const propName =
            itemRef.indexOf("page")      !== -1 ? "pageCategories"      :
            itemRef.indexOf("element")   !== -1 ? "elementCategories"   :
            itemRef.indexOf("inputtype") !== -1 ? "inputTypeCategories" : ""

        return Account.findByIdAndUpdate(
            user.owner,
            {$addToSet: {[propName]: categoryID}}
        )
    }
}

import Token   from "../model/Token"
import Account from "../model/Account"
import User    from "../model/User"

export default {
    /*
     * Mutations
     */
    async createToken({account, email, password}) {
        // Verify a User with `email` exists in `account`
        let accountModel
        let user
        if(account) {
            accountModel = await Account.findById(account)
            for(const userID of accountModel.users) {
                const userI = await User.findById(userID)
                if(userI.email === email) {
                    user = userI
                    break
                }
            }
        } else {
            user = await User.findOne({email})

            if(user) {
                if(user.owner) {
                    accountModel = await Account.findById(user.owner)
                } else {
                    accountModel = await Account.containingUser(user._id)
                }
            }
        }

        // Verify we were able to find account
        if(!accountModel) {
            throw {
                message: "No account specified and unable to infer."
            }
        }

        // Verify user exists in account
        const correctAcct = !!user
        if(!correctAcct) {
            throw {
                message: "User does not exist in account."
            }
        }

        // Verify password is correct
        const correctPass = await user.checkPassword(password)
        if(!correctPass) {
            throw {
                message: "Password is incorrect."
            }
        }

        // How long till expiration (in ms)
        const expiresIn = 1000 * 60 * 10
        // Create token in database
        const tokenModel = new Token({
            token:   Token.rawToken(),
            expires: new Date(new Date().getTime() + expiresIn).toISOString(),
            account: accountModel._id,
            user:    user._id
        })
        await tokenModel.save()
        return tokenModel
    }
}

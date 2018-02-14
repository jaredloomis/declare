import Token   from "../model/Token"
import Account from "../model/Account"
import User    from "../model/User"

export default {
    /*
     * Mutations
     */
    async createToken({account, email, password}) {
        // Verify a User with `email` exists in `account`
        const accountModel = await Account.findById(account)
        let user
        for(const userID of accountModel.users) {
            const userI = await User.findById(userID)
            if(userI.email === email) {
                user = userI
                break
            }
        }
        const correctAcct  = !!user

        // Verify password is correct
        const correctPass  = await user.checkPassword(password)

        if(correctAcct && correctPass) {
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
        } else {
            return null
        }
    }
}

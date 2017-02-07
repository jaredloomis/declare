const passport      = require("koa-passport")
const LocalStrategy = require("passport-local").Strategy

const User = require("../model/User")

module.exports = app => {
    passport.serializeUser((user, cb) => cb(null, user._id))
    passport.deserializeUser((id, cb) => {
        User.findById(id).exec().then((user) => cb(null, user))
    })

    const opts = {usernameField: "email"}
    passport.use(new LocalStrategy(opts, (email, password, cb) => {
        User.find({email: email}).exec().then(user => cb(null, user))
    }))
}

const passport = require("koa-passport")
const LocalStrategy = require("passport-local").Strategy

module.exports = (app) => {
    passport.serializeUser((user, cb) => cb(null, user.id))
    passport.deserializeUser((id, cb) => {
        app.context.models.user.findOne({id: id}).exec((err, user) => {
            cb(null, user)
        })
    })
    passport.use(new LocalStrategy((username, password, cb) => {
        app.context.models.user.findOne({email: username}).exec((err, user) => {
            if(err) {
                return cb(err, false)
            }
            cb(null, user)
        })
    }))
}

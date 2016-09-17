const Router   = require("koa-router")
const passport = require("koa-passport")

module.exports = function(app) {
    const router = new Router()

    // POST /User - Add User
    router.post("/User", function*() {
        try {
            this.body =
                yield app.context.models.user.create(this.request.body)
        } catch(ex) {
            this.body = ex
        }
    })

    // GET /User - List Users
    router.get("/User", function*() {
        try {
            this.body = yield app.context.models.user.find({})
        } catch(ex) {
            this.body = ex
        }
    })

    // POST /User/Login - Login
    router.post("/User/Login", function*(next) {
        const ctx = this;
        yield passport.authenticate("local", function*(err, user, info) {
            if(err) {
                this.body = err
                return
            }
            if(user === false) {
                ctx.status = 401
                ctx.body = {success: false}
            } else {
                yield ctx.login(user)
                ctx.body = {success: true}
            }
        }).call(this, next)
    })

    // GET /User/:id - Read User
    router.get("/User/:id", function*() {
        try {
            this.body =
                yield app.context.models.user.findOne(this.params.id)
        } catch(ex) {
            this.body = ex
        }
    })

    return router
}

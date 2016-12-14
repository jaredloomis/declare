const Router   = require("koa-router")
const passport = require("koa-passport")
//const Promise  = require("bluebird")
const User     = require("../model/User")

module.exports = function(app) {
    const router = Router()

    // POST /User - Add User
    router.post("/User", async ctx => {
        try {
            const user = new User(ctx.request.body)
            ctx.body = await user.save()
        } catch(ex) {
            ctx.status = 500
            ctx.body   = {
                status: false,
                error: ex
            }
        }
    })

    // GET /User - List Users
    router.get("/User", async ctx => {
        try {
            ctx.body = await User.find()
        } catch(ex) {
            ctx.status = 500
            ctx.body   = {
                status: false,
                error: ex
            }
        }
    })

    // POST /User/Login - Login
    router.post("/User/Login", async (ctx, next) => {
        await passport.authenticate("local", (err, user, info) => {
            if(user === false) {
                ctx.status = 401
                ctx.body = {success: false}
            } else {
                ctx.body = {success: true}
                return ctx.login(user)
            }
        })(ctx, next)
    })

    // DELETE /User - Delete User
    router.delete("/User/:id", async ctx => {
        try {
            ctx.body = await User.remove({_id: ctx.params.id})
        } catch(ex) {
            ctx.status = 500
            ctx.body   = {
                status: false,
                error: ex
            }
        }
    })

    router.post("/User/Test", async ctx => {
        try {
            const body  = ctx.request.body
            const pass  = body.password

            const user  = await app.context.models.User.findOneAsync(body.id)
            ctx.body    = await user.checkPassword(pass)
        } catch(ex) {
            ctx.status = 500
            ctx.body   = {
                status: false,
                error: ex
            }
        }
    })

    // GET /User/:id - Read User
    router.get("/User/:id", async ctx => {
        try {
            ctx.body = await User.findById(ctx.params.id).exec()
        } catch(ex) {
            ctx.status = 500
            ctx.body   = {
                status: false,
                error: ex
            }
        }
    })

    return router
}

const Router   = require("koa-router")
const passport = require("koa-passport")
const Promise  = require("bluebird")
const schema   = require("../model/schema")

module.exports = function(app) {
    const router = Router()

    // POST /User - Add User
    router.post("/User", async (ctx) => {
        try {
            ctx.body =
                await app.context.models.User.createAsync(ctx.request.fields)
        } catch(ex) {
            ctx.body = ex
        }
    })

    // GET /User - List Users
    router.get("/User", async (ctx) => {
        try {
            ctx.body = await app.context.models.User.allAsync()
        } catch(ex) {
            ctx.status = 500
            ctx.body = {error: ex}
        }
    })

    router.get("/User/Test", async (ctx) => {
        const users = await app.context.models.User.allAsync()
        ctx.body = await users[0].checkPassword("test")
    })

    router.get("/User/Delete", async (ctx) => {
        ctx.body = await app.context.models.User.destroyAllAsync()
    })

    // POST /User/Login - Login
    router.post("/User/Login", async (ctx, next) => {
        await passport.authenticate("local", function*(err, user, info) {
            if(err) {
                ctx.body = err
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
    router.get("/User/:id", async (ctx, next) => {
        try {
            ctx.body =
                await app.context.models.user.findOne(ctx.params.id)
        } catch(ex) {
            ctx.body = ex
        }
    })

    return router
}

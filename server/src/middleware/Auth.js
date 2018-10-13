import {User, Token}  from "declare-db"

export default async (ctx, next) => {
    if(ctx.request.header.token) {
        const token = await Token.findOne({
            token: ctx.request.header.token
        })
        if(token) {
            ctx.state.user = await User.findById(token.user)
        }
    }

    await next()
}

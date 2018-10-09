import User  from "../model/User"
import Token from "../model/Token"

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

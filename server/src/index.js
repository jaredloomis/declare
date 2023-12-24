require("dotenv").config()
import fs            from "fs"
import path          from "path"
import http          from "http"
import Promise       from "bluebird"

import Koa           from "koa"
import convert       from "koa-convert"
import body          from "koa-bodyparser"
import session       from "koa-session"
import assets        from "koa-static"
import compress      from "koa-compress"

import socket        from "./socket"
import requestLogger from "./middleware/RequestLogger.js"
import authenticate  from "./middleware/Auth.js"
import serverConf    from "./config/server"

// Use bluebird promises
global.Promise = Promise

const app = new Koa()

/*
 * Middleware
 */

// Body parser
app.use(body())

// Logging
app.use(requestLogger)

// Session
app.keys = ["wizardbutterfly" + Math.random()]
app.use(convert(session(app)))

// Authentication
app.use(authenticate)

// Compression
// XXX: needed? static uses compressed files if present
app.use(compress())

/*
 * Routes
 */

// Root path "/" equals "/index.html"
app.use((ctx, next) => {
    if(ctx.request.path === "" || ctx.request.path === "/") {
        console.log(ctx.request.path)
        ctx.request.path = "/index.html"
    }

    return next()
})

// Static assets
app.use(assets(path.join(__dirname, "..", "..", "new-client", "dist"), {
    // 1 week
    maxage: 3000,
    // Brotli compression
    br: true,
    // GZip compression
    gzip: true
}))

// Read all controllers and register their returned routes
fs.readdirSync(path.join(__dirname, "controller"))
    .filter(file => file.indexOf(".") !== 0)
    .forEach(file => {
        const mod    = require(path.join(__dirname, "controller", file))
        const router = mod.default || mod
        if(router.routes && router.allowedMethods) {
            app.use(router.routes())
               .use(router.allowedMethods())
        }
    })

/*
 * Start
 */

const server = http.createServer(app.callback())
server.listen(serverConf.port)
socket(server)

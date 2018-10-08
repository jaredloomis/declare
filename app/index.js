import fs            from "fs"
import path          from "path"
import http          from "http"
import Promise       from "bluebird"

import Koa           from "koa"
import convert       from "koa-convert"
import body          from "koa-bodyparser"
import session       from "koa-session"
import assets        from "koa-static"
import websockify    from "koa-websocket"
import compress      from "koa-compress"

import mongoose      from "mongoose"

import socket        from "./socket"
import logger        from "./common/Logger"
import requestLogger from "./middleware/RequestLogger.js"
import authenticate  from "./middleware/Auth.js"
import {development as dbConfig} from "./config/database"

const app = new Koa() //websockify(new Koa())

// Use bluebird promises
mongoose.Promise = Promise
global.Promise   = Promise

/*
 * Set up database
 */

// Conect to MongoDB server
mongoose.connect(`mongodb://${dbConfig.host}/${dbConfig.database}`)

const db = mongoose.connection
// Set up error logging
db.on("error", err => logger.error("Error from DB!", err))
db.once("open", () => {/* we're connected! */})

/*
 * Middleware
 */

// Body parser
app.use(body())

// Session
app.keys = ["wizardbutterfly" + Math.random()]
app.use(convert(session(app)))

// Authentication
app.use(authenticate)

// Logging
app.use(requestLogger)

// Static assets
app.use(assets(path.join(__dirname, "..", "..", "public", "dist"), {
    // 1 week
    maxage: 3000,
    // Brotli compression
    br: true,
    // GZip compression
    gzip: true
}))

// Compression
app.use(compress({
    /*filter(contentType) {
        return /text/i.test(contentType)
    },*/
    //threshold: 2048,
    //flush: require("zlib").Z_SYNC_FLUSH
}))

/*
 * Routes
 */

// Read all controllers and set them up
fs
.readdirSync(path.join(__dirname, "controller"))
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
server.listen(process.env.PORT || 3000)
socket(server)

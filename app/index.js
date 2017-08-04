import fs            from "fs"
import path          from "path"
import http          from "http"
import Promise       from "bluebird"

import Koa           from "koa"
import convert       from "koa-convert"
import body          from "koa-bodyparser"
import session       from "koa-session"
import passport      from "koa-passport"
import assets        from "koa-static"
import websockify    from "koa-websocket"

import mongoose      from "mongoose"
import logger        from "./services/Logger.js"
import {development as dbConfig} from "./config/database"

import "./model/InputType"

const app = websockify(new Koa())

/*
 * Set up database
 */

// Use bluebird promises
mongoose.Promise = Promise
global.Promise   = Promise
// Conect to MongoDB server
mongoose.connect("mongodb://" + dbConfig.host + "/" + dbConfig.database)

const db = mongoose.connection
// Set up error logging
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function() {/* we're connected! */})

/*
 * Middleware
 */

// Body parser
app.use(body())
// Simple req/res logging
//app.use(logger())
// Session
app.keys = ["super-secret"]
app.use(convert(session(app)))
// Passport
app.use(passport.initialize())
app.use(passport.session())
require("./services/Auth")(app)
// Winston logging
logger(app)
// Static assets
app.use(assets(path.join(__dirname, "..", "..", "public", "dist"), {
    // 1 week
    maxage: 657000
}))

/*
 * Routes
 */

// Read all controllers and set them up
fs
.readdirSync(path.join(__dirname, "controller"))
.filter(file => file.indexOf(".") !== 0)
.forEach(file => {
    const router = require(path.join(__dirname, "controller", file))
    if(router.routes && router.allowedMethods) {
        app.use(router.routes())
           .use(router.allowedMethods())
    }
})

/*
 * Start
 */

const server = http.createServer(app.callback())
//require("./socket")(server)
server.listen(3000)
//app.listen(3000)

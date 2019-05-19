import http       from "http"
import Promise    from "bluebird"

import Koa        from "koa"
import body       from "koa-bodyparser"
import Router     from "koa-router"

import {TestRun}  from "declare-db"

import serverConf from "./config/server"
import executeTestRun from "./TestRun"

// Use bluebird promises
global.Promise = Promise

const app = new Koa()

/*
 * Middleware
 */

// Body parser
app.use(body())

// TODO Logging
//app.use(requestLogger)

/*
 * Routes
 */

const router = new Router()

// POST /ExecuteTestRun
router.post("/ExecuteTestRun", async ctx => {
    try {
        const {testRunID} = ctx.request.body
        const testRun = await TestRun.findById(testRunID)
        const res = await executeTestRun(testRun)
        ctx.body = {
            status: true,
            ...res
        }
    } catch(ex) {
        console.log(ex)
        ctx.status = 500
        ctx.body   = {
            status: false,
            error: ex
        }
    }
})

app.use(router.routes())
   .use(router.allowedMethods())

/*
 * Start
 */

const server = http.createServer(app.callback())
server.listen(serverConf.port)

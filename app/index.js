const fs   = require("fs")
const path = require("path")

const Koa      = require("koa")
const app      = Koa()
const logger   = require("koa-logger")
const body     = require("koa-body")
const mount    = require("koa-mount")
const session  = require("koa-session")
const passport = require("koa-passport")
const graphql  = require("koa-graphql")

const Waterline    = require("waterline")
const mongoAdapter = require("sails-mongo")

/*
 * Waterline ORM
 */ 

const orm = new Waterline()

const config = {
    adapters: {
        mongo: mongoAdapter
    },

    connections: {
        myMongo: {
            adapter: "mongo",
            host: "localhost",
            user: "root",
            database: "uqa"
        }
    }
}

// Read all models and set them up
fs
.readdirSync(path.join(__dirname, "model"))
.filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
.forEach(file => {
    const model = require(path.join(__dirname, "model", file))
    orm.loadCollection(model)
})

orm.initialize(config, (err, models) => {
    if(err) {
        console.log(err)
    }
    // Allow models and connections to be accessible via app
    app.context.models = models.collections
    app.context.connections = models.connections
})

/*
 * Middleware
 */

app.use(body())
app.use(logger())
app.keys = ["super-secret"]
app.use(session(app))

app.use(passport.initialize())
app.use(passport.session())
require("./services/Auth")(app)

/*
 * Routes
 */

// Read all controllers and set them up
fs
.readdirSync(path.join(__dirname, "controller"))
.filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
.forEach(file => {
    const router = require(path.join(__dirname, "controller", file))(app)
    app.use(router.routes())
       .use(router.allowedMethods())
})

/*
 * Start
 */

app.listen(3000)

const fs   = require("fs")
const path = require("path")
const Promise  = require("bluebird")

const Koa      = require("koa")
const app      = new Koa()
const logger   = require("koa-logger")
const body     = require("koa-better-body")
const mount    = require("koa-mount")
const session  = require("koa-session")
const passport = require("koa-passport")
const graphql  = require("koa-graphql")
const convert  = require("koa-convert")

const Waterline    = require("waterline")
const mongoAdapter = require("sails-mongo")
const caminte = require("caminte")
const Schema = caminte.Schema

const dbConfig  = require("./config/database")

/*
 * Models
 */

/*
const schema = new Schema(dbConfig.development.driver, dbConfig.development)

// Read all models and set them up
fs
.readdirSync(path.join(__dirname, "model"))
.filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
.forEach(file => {
    require(path.join(__dirname, "model", file))(schema)
})
// Promisify various methods
const queryMethods = [
    "all", "findOne", "findById", "create", "destroyAll"
]
for(const key in schema.models) {
    const model = schema.models[key];
    for(var i = 0; i < queryMethods.length; ++i) {
        const methName = queryMethods[i]
        schema.models[key][methName + "Async"] =
            Promise.promisify(model[methName], {
                context: schema.models[key]
            })
    }
}
*/
const schema = require("./model/schema")
app.context.models = schema.models

/*
 * Middleware
 */

app.use(convert(body()))
app.use(logger())
app.keys = ["super-secret"]
app.use(convert(session(app)))

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

var router = require('koa-router')();

router.get('/', function(ctx, next) {
    console.log("hello")
    next()
})

app
  .use(router.routes())
  .use(router.allowedMethods());

/*
 * Start
 */

app.listen(3000)

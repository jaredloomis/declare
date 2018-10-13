const Promise   = require("bluebird")
const fs        = require("fs")
const path      = require("path")
const mongoose  = require("mongoose")
const dbConfigs = require("./config")

// Use bluebird promises
mongoose.Promise = Promise
global.Promise   = Promise

// Connect to db
const rawEnv = process.env.NODE_ENV
const envStr = rawEnv && rawEnv.length === 0 ? rawEnv : "development"
const dbConf = dbConfigs[envStr]
mongoose.connect(`mongodb://${dbConf.host}:${dbConf.port}/${dbConf.database}`)

const db = mongoose.connection
// Set up error logging
db.on("error", err => console.error("Error from DB!", err))
db.once("open", () => {})

const modules = fs.readdirSync(__dirname, {withFileTypes: true})
    .filter(file => !file.isDirectory() && file.name.indexOf(".") !== 0 && file.name.indexOf("index") !== 0 &&
                    file.name.indexOf("config") !== 0)
    .reduce((exp, file) => ({
        ...exp,
        [file.name.split(".")[0]]: require(path.join(__dirname, file.name))
    }))

modules["Account"] = require("./Account")

module.exports = modules

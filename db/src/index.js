const Promise  = require("bluebird")
const fs       = require("fs")
const path     = require("path")
const mongoose = require("mongoose")
const dbConfig = require("./config").default

// Use bluebird promises
mongoose.Promise = Promise
global.Promise   = Promise

// Connect to db
mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`)

// Set up error logging
const db = mongoose.connection
db.on("error", err => console.error("Error from DB!", err))
db.once("open", () => {})

const modules = fs.readdirSync(__dirname)
    .filter(file =>
        !fs.lstatSync(path.join(__dirname, file)).isDirectory() &&
        file.indexOf(".") !== 0 && file.indexOf("index") !== 0 &&
        file.indexOf("config") !== 0
    )
    .reduce((exp, file) => ({
        ...exp,
        [file.split(".")[0]]: require(path.join(__dirname, file))
    }))

modules["Account"] = require("./Account")
modules["pubSub"]  = require("./pubSub")

module.exports = modules

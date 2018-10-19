const Promise  = require("bluebird")
const fs       = require("fs")
const path     = require("path")
const mongoose = require("mongoose")
const dbConfig = require("./config").default

// Use bluebird promises
mongoose.Promise = Promise
global.Promise   = Promise

// Patch valueOf and toJSON function for ObjectIds to fix serialization
mongoose.Types.ObjectId.prototype.valueOf = function() {
    return this.toString()
}
mongoose.Types.ObjectId.prototype.toJSON = function() {
    return this.toString()
}

// Connect to db
const mongoUri = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
mongoose.connect(mongoUri)

// Set up logging
const db = mongoose.connection
db.on("error", err => {
    throw new Error({message: `Could not connect to db ${mongoUri}`, err})
})
db.once("open", () =>
    console.log("Connection to MongoDB has been established")
)

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

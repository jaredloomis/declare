const fs   = require("fs")
const path = require("path")

const modules = fs.readdirSync(__dirname, {withFileTypes: true})
//    .map(x => console.log(x.name, !x.isDirectory() && x.name.indexOf(".") !== 0 && x.name.indexOf("index") !== 0) || x)
    .filter(file => !file.isDirectory() && file.name.indexOf(".") !== 0 && file.name.indexOf("index") !== 0)
    .reduce((exp, file) => {
        //        console.log("MODULE", file.name)
        return {
            ...exp,
            [file.name.split(".")[0]]: require(path.join(__dirname, file.name))
        }
    })

modules["Account"] = require("./Account")

module.exports = modules

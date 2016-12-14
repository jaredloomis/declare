module.exports.production = {
    driver     : "mongo",
    host       : "localhost",
    port       : "27017",
    username   : "root",
    password   : "",
    database   : "test",
    autoReconnect : true
}

module.exports.development = {
    driver     : "mongo",
    host       : "localhost",
    port       : "27017",
    username   : "root",
    password   : "",
    database   : "test",
    autoReconnect : true
}

module.exports.test = {
    driver     : "mongo",
    host       : "localhost",
    port       : "27017",
    username   : "root",
    password   : "",
    database   : "test",
    autoReconnect : true
}

module.exports.dev = module.exports.development

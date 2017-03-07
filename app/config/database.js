module.exports.production = {
    driver     : "mongo",
    host       : "localhost",
    port       : "27017",
    username   : "root",
    password   : "",
    database   : "declare",
    autoReconnect : true
}

module.exports.development = {
    driver     : "mongo",
    host       : "localhost",
    port       : "27017",
    username   : "root",
    password   : "",
    database   : "declare-dev",
    autoReconnect : true
}

module.exports.qa = {
    driver     : "mongo",
    host       : "localhost",
    port       : "27017",
    username   : "root",
    password   : "",
    database   : "declare-qa",
    autoReconnect : true
}

module.exports.dev = module.exports.development

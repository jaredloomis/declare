export const production = {
    driver     : "mongo",
    host       : "localhost",
    port       : "27017",
    username   : "root",
    password   : "",
    database   : "declare",
    autoReconnect : true
}

export const development = {
    driver     : "mongo",
    host       : "localhost",
    port       : "27017",
    username   : "root",
    password   : "",
    database   : "declare-dev",
    autoReconnect : true
}

export default (process.env.NODE_ENV || "").indexOf("prod") === 0 ?
    production :
    development

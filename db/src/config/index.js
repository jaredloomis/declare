export const production = {
    driver     : "mongo",
    host       : "10.5.96.3",
    port       : "27017",
    username   : "root",
    password   : "",
    database   : "declare",
    autoReconnect : true
}

export const development = {
    driver     : "mongo",
    host       : "144.202.112.151",//"localhost",
    port       : "80",
    username   : "root",
    password   : "",
    database   : "declare-dev",
    autoReconnect : true
}

export default (process.env.NODE_ENV || "").indexOf("prod") === 0 ?
    production :
    development

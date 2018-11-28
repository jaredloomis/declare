export const production = {
    driver     : "mongo",
    host       : "10.5.96.3",
    port       : "80",
    username   : "root",
    password   : "lA0EGv7p6oXG7OWc",
    database   : "declare",
    authSource:  "admin",
    autoReconnect : true
}

export const development = {
    driver     : "mongo",
    host       : "localhost",
    port       : "27017",
//    username   : "root",
//    password   : "lA0EGv7p6oXG7OWc",
    database   : "declare-dev",
    autoReconnect : true,
//    authSource:  "admin"
}

export default process.env.NODE_ENV === "production" ?
    production :
    development

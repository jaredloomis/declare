export const production = {
    driver     : "mongo",
    host       : "144.202.112.151",
    port       : "80",
    username   : "root",
    password   : "lA0EGv7p6oXG7OWc",
    database   : "declare",
    authSource:  "admin",
    autoReconnect : true,
    vhost: "declaredb",
    pubsubUsername: "admin",
    pubsubPassword: "B3o8mFCcKq5sIB"
}

export const development = {
    driver     : "mongo",
    host       : "localhost",
    port       : "27017",
//    username   : "root",
//    password   : "lA0EGv7p6oXG7OWc",
    database   : "declare-dev",
    autoReconnect : true,
    vhost: "declaredb",
    pubsubUsername: "admin",
    pubsubPassword: "1234"
//    authSource:  "admin"
}

export default process.env.NODE_ENV === "production" ?
    production :
    development

export const production = {
    driver     : "mongo",
    host       : "10.5.96.3",
    port       : "27017",
    username   : "jaredloomis",
    password   : "Mq$Cj3iN$jecQ%",
    database   : "declare",
    autoReconnect : true
}

export const development = {
    driver     : "mongo",
    host       : "144.202.112.151",
    port       : "27017",
    username   : "jaredloomis",
    password   : "Mq$Cj3iN$jecQ%",
    database   : "declare-dev",
    autoReconnect : true
}

export default process.env.NODE_ENV === "production" ?
    production :
    development

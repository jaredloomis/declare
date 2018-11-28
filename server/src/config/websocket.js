export const production = {
    port: process.env.WS_PORT || 81
}

export const development = {
    port: process.env.WS_PORT || 3001
}

export default (process.env.NODE_ENV || "").indexOf("prod") === 0 ?
    production :
    development

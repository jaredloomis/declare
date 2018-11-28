export const production = {
    port: process.env.PORT || 3000
}

export const development = {
    port: process.env.PORT || 3000
}

export default (process.env.NODE_ENV || "").indexOf("prod") === 0 ?
    production :
    development

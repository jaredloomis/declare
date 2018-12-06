export const development = {
    uri:  process.env.EXECUTOR_URI  || "localhost",
    port: process.env.EXECUTOR_PORT || "1234"
}

export const qa = {
    uri:  process.env.EXECUTOR_URI  || "45.32.83.234",
    port: process.env.EXECUTOR_PORT || "80"
}

export const production = {
    uri:  process.env.EXECUTOR_URI  || qa.uri,//"10.5.96.4",
    port: process.env.EXECUTOR_PORT || "80"
}

export default   process.env.NODE_ENV === "production" ?
    production : process.env.NODE_ENV === "qa" ?
    qa         :
    development

export const development = {
    port: process.env.PORT || "1234"
}

export const production = {
    port: process.env.PORT || "80"
}

export default process.env.NODE_ENV === "production" ?
    production : development

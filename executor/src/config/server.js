export const development = {
    port: "1234"
}

export const production = {
    port: "80"
}

export default process.env.NODE_ENV === "production" ?
    production : development

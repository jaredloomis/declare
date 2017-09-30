// This file exists to re-export bulma stuff with JS-friendly names

import bulma from "./bulma.scss"

function camelCase(input) { 
    return input.toLowerCase().replace(/-(.)/g, (match, group1) =>
        group1.toUpperCase()
    )
}

function dashToUnderscore(input) { 
    return input.toLowerCase().replace(/-/g, "_")
}

for(const prop in bulma) {
    if(bulma.hasOwnProperty(prop)) {
        if(prop.indexOf("-") > -1 || prop.indexOf("_") > -1) {
            const propPrime = dashToUnderscore(prop) //camelCase(prop)
            bulma[propPrime] = bulma[prop]
            // delete bulma[prop]
        }
    } 
}

export default bulma

// @flow
import seedrandom from "seedrandom"

/**
 * Generate a random Input (string) given an InputType's constraints
 */
export const validInput = (constraints: Array<any>, seed: ?string): string => {
    const rng = seedrandom(seed || `${Math.random()}`)

    // Combine constraints into monolothic constraints object,
    // with implicit randomness filled in (min,maxLength->length)
    const reifiedConstraints = constraints.reduce((acc, constraint: any) => {
        if(typeof constraint.exact === "string") {
            return Object.assign(constraint, {exact: (constraint.exact: string)})
        } else if(constraint.minLength || constraint.maxLength) {
            const length = randomRange(
                rng, constraint.minLength || 0, constraint.maxLength || -1
            )
            return Object.assign(constraint, {length})
        } else {
            return constraint
        }
    }, {})

    // Send entire constraints object to function
    // that generates it
    return randomGen(rng, reifiedConstraints)
}

function randomGen(rng: () => number, constraints: any): string {
    // Exact is exact no matter what
    if(constraints.exact) {
        return constraints.exact
    }

    // Create string
    let str = ""
    for(let i = 0; i < 100; ++i) str += `${Math.random()}`.slice(3, 4)
    // Apply length constraint
    if(constraints.length) str = str.slice(0, constraints.length)
    
    return str
}

const randomRange = (rng, min, max) => Math.floor(rng() * max) + min

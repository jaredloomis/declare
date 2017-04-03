export const deepGet = (selectorArr, obj) => !obj ? obj :
    selectorArr.reduce((vals, field) => (vals && vals[field]) || undefined, obj)

export const deepSet = (selectorArr, value, obj) => {
    const ret = Object.assign({}, obj)
    let root = ret
    for(let i = 0; i < selectorArr.length-1; ++i) {
        const field = selectorArr[i]
        const validArray  = Array.isArray(root) && isNumeric(field)
        //// Perform validation on next iteration
        const next = root[field]
        const nextField = selectorArr[i+1]
        const nextIsArr = Array.isArray(next) && isNumeric(nextField)
        const nextIsObj = typeof(next) === "object" &&
                            !Array.isArray(next) && !isNumeric(nextField)
        // Make sure types match
        if(!nextIsArr && !nextIsObj) {
            if(!next) {
                root[field] = isNumeric(field) ? [] : {}
            } else if(Array.isArray(next)) {
                if(!isNumeric(nextField) && next.length === 0) {
                    root[field] = {}
                }
            } else {
                if(isNumeric(nextField)) {
                    if(next === {}) {
                        root[field] = []
                    } else {
                        let pseudoArr = true
                        const realArr = []
                        for(const key in next) {
                            if(!isNumeric(key)) {
                                pseudoArr = false
                                break
                            } else {
                                realArr[key] = next[key]
                            }
                        }

                        if(pseudoArr) {
                            console.log(JSON.stringify(realArr))
                            root[field] = realArr
                        }
                    }
                }
            }
        }
        /// End validation
        // If field doesn't already exist in an object
        if(!(field in root) && !validArray) {
            // Create field (using info from next field in selector)
            const nextField = selectorArr[i+1]
            root[field] = isNumeric(nextField) ? [] : {}
        }
        root = root[field]
    }
    root[selectorArr[selectorArr.length-1]] = value
    return ret
}

const DIGITS = "0123456789"

function isNumeric(str) {
    if(!str) return false
    for(let i = 0; i < str.length; ++i) {
        if(DIGITS.indexOf(str[i]) === -1)
            return false
    }
    return true
}

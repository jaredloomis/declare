import {GraphQLObjectType} from "graphql"
import GraphQLJSON from "graphql-type-json"

const cache = {}

export default (baseType, opts={}) => {
    const name = (() => {
        if(opts.name)
            return opts.name
        if(baseType.name)
            return `${baseType.name}_CanError`
        return "CanError"
    })()

    if(cache[name] && name !== "CanError") {
        return cache[name]
    }

    const ret = new GraphQLObjectType({
        name,
        fields: {
            [opts.dataFieldName || "data"]: {
                type: baseType
            },
            error: {
                type: GraphQLJSON
            }
        }
    })

    cache[name] = ret

    return ret
}

export const wrapExceptional = async action => {
    try {
        return {data: await action()}
    } catch(ex) {
        console.log("wrapExceptional caught exception:", ex)
        return {error: ex}
    }
}

import {GraphQLObjectType, GraphQLNonNull} from "graphql"
import GraphQLJSON from "graphql-type-json"

export default (baseType, opts={}) => {
    const name = (() => {
        if(opts.name)
            return opts.name
        if(baseType._typeConfig)
            return `${baseType._typeConfig.name}_CanError`
        return "CanError"
    })()

    return new GraphQLObjectType({
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

    /*
    if(baseType._typeConfig && baseType._typeConfig.fields) {
        console.log("typeConfig", baseType._typeConfig)
        console.log("fields", baseType._typeConfig.fields)
        const fields = {
            error: {
                type: GraphQLJSON
            }
        }
        for(const fieldKey in baseType._typeConfig.fields) {
            const field = baseType._typeConfig.fields[fieldKey]
            if(field instanceof GraphQLNonNull) {
                fields[fieldKey] = field.type.ofType
            } else {
                fields[fieldKey] = field
            }
        }
        return new GraphQLObjectType({
            name: opts.name || `${baseType._typeConfig.name}_CanError`,
            description: baseType._typeConfig.description,
            fields
        })
    } else if(baseType.ofType) {
        
    } else {
        debugger

        return new GraphQLObjectType({
            name: opts.name || "CanError",
            fields: {
                [opts.dataFieldName || "data"]: {
                    type: baseType
                },
                error: {
                    type: GraphQLJSON
                }
            }
        })
    }
    */
}

export const wrapExceptional = async action => {
    try {
        return {data: await action()}
    } catch(ex) {
        return {error: ex}
    }
}

import {
    GraphQLNonNull, GraphQLID
} from "graphql"

import InputType from "../../model/InputType"

export default {
    createInputType: {
        type: InputType.graphQL,
        args: {
            inputType: {
                name: "inputType",
                type: InputType.graphQLInput
            }
        },
        async resolve(parent, {inputType}) {
            return await new InputType(inputType).save()
        }
    },
    updateInputType: {
        type: InputType.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            },
            inputType: {
                name: "inputType",
                type: InputType.graphQLInput
            }
        },
        async resolve(parent, {id, inputType}) {
            await InputType.findByIdAndUpdate(id, inputType)
            const ret = await InputType.findById(id)
            return ret
        }
    },
    removeInputType: {
        type: InputType.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(object, {id}) {
            return await InputType.findByIdAndRemove(id)
        }
    }
}

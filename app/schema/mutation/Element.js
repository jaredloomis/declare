import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import Element from "../../model/Element"

export default {
    createElement: {
        type: Element.graphQL,
        args: {
            element: {
                type: Element.graphQLInput
            }
        },
        async resolve(parent, {element}) {
            return await new Element(element).save()
        }
    },
    updateElement: {
        type: Element.graphQL,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            element: {
                type: Element.graphQLInput
            }
        },
        async resolve(parent, {id, element}) {
            await Element.findByIdAndUpdate(id, element)
            return await Element.findById(id)
        }
    },
    removeElement: {
        type: Element.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(object, {id}) {
            return await Element.findByIdAndRemove(id)
        }
    }
}

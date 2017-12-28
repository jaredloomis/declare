import {
    GraphQLID, GraphQLNonNull
} from "graphql"

import logger   from "../../common/Logger"
import Category from "../../model/Category"

export default {
    createCategory: {
        type: Category.graphQL,
        args: {
            category: {
                type: new GraphQLNonNull(Category.graphQLInput)
            }
        },
        async resolve(_parent, {category}) {
            try {
                const {parent} = category
                delete category.parent
                const categoryModel = await new Category(category).save()
                if(parent) {
                    categoryModel.parent = parent
                    await categoryModel.save()
                }
                return categoryModel
            } catch(ex) {
                console.log(ex)
                logger.log("error", "Error while creating Category", ex)
                return ex
            }
        }
    },
    updateCategory: {
        type: Category.graphQL,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            category: {
                type: new GraphQLNonNull(Category.graphQLInput)
            }
        },
        async resolve(_parent, {id, category}) {
            try {
                const parent = category.parent
                delete category.parent
                const categoryModel = await Category.findByIdAndUpdate(id, category)
                if(categoryModel.parent !== parent) {
                    categoryModel.parent = parent
                    await categoryModel.save()
                }
                return categoryModel
            } catch(ex) {
                console.log(ex)
                logger.log("error", "Error while creating Category", ex)
                return ex
            }
        }
    },
    removeCategory: {
        type: Category.graphQL,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(object, {id}) {
            const cat = await Category.findById(id)
            await cat.remove()

            if(cat.parent) {
                await Category.findByIdAndUpdate(
                    cat.parent,
                    {$pull: {children: id}}
                )

            }

            return cat
        }
    }
}

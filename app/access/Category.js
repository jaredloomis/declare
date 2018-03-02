import Category from "../model/Category"
import Account  from "../model/Account"

export default {
    /*
     * Queries
     */

    categories({user}) {
        if(user && user.isSuperAdmin()) {
            return Category.find({})
        } else {
            return Category.find({owner: user.owner})
        }
    },

    async category({id}, {user}) {
        const cat = await Category.findById(id)
        if(user && cat && cat.owner === user.owner) {
            return cat
        } else {
            throw {
                message: "Cannot access categories not in your account."
            }
        }
    },

    /*
     * Mutations
     */

    async createCategory({category}, {user}) {
        const {parent} = category
        delete category.parent
        const categoryModel = await new Category(category).save()
        if(parent) {
            categoryModel.parent = parent
            await categoryModel.save()
        }
        return categoryModel
    },

    async updateCategory({id, category}, {user}) {
        const categoryModel = await Category.findById(id)

        // Ensure user has permission to access category
        if(categoryModel.owner !== user.owner) {
            throw {
                message: "You don't have permission to modify this category."
            }
        }

        const parent = category.parent
        delete category.parent
        await Category.findByIdAndUpdate(id, category)
        if(categoryModel.parent !== parent) {
            categoryModel.parent = parent
            await categoryModel.save()
        }
        return categoryModel
    },

    async removeCategory({id}, {user}) {
        const cat = await Category.findById(id)

        if(cat.owner !== user.owner) {
            throw {
                message: "You don't have permission to delete this category."
            }
        }

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

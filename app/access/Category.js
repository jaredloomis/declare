import Category from "../model/Category"
import Product  from "../model/Product"

import accountAuth from "./validation/accountAuth"

export default {
    /*
     * Queries
     */

    categories({user}) {
        accountAuth(user, null, {validateEntity: false})

        if(user && user.isSuperAdmin()) {
            return Category.find({})
        } else if(user.owner) {
            return Category.find({owner: user.owner})
        } else {
            throw {
                message: "User not connected to an account."
            }
        }
    },

    async category({id}, {user}) {
        const cat = await Category.findById(id)
        accountAuth(user, cat)
        return cat
    },

    /*
     * Mutations
     */

    async createCategory({category}, {user}) {
        if(!category.owner) {
            category.owner = user.owner
        }
        const {parent} = category
        delete category.parent
        const categoryModel = await new Category(category).save()
        if(parent) {
            categoryModel.parent = parent
            await categoryModel.save()
        }

        accountAuth(user, categoryModel)

        // Add category to product.{itemRef}Categories
        if(!parent) {
            const product = await Product.findById(category.product)
            product[`${category.itemRef}Categories`] = product[`${category.itemRef}Categories`]
                .concat([categoryModel._id])
            await product.save()
        }

        return categoryModel
    },

    async updateCategory({id, category}, {user}) {
        const categoryModel = await Category.findById(id)

        accountAuth(user, categoryModel)

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

        accountAuth(user, cat)

        // Remove category from product.{itemRef}Categories
        if(!cat.parent) {
            const product = await Product.findById(cat.product)
            product[`${cat.itemRef}Categories`] = product[`${cat.itemRef}Categories`]
                .filter(tid => !tid.equals(cat._id))
            await product.save()
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

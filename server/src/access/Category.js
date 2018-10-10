import Category  from "../model/Category"
import Product   from "../model/Product"
import Page      from "../model/Page"
import Element   from "../model/Element"
import InputType from "../model/InputType"

import accountAuth from "./validation/accountAuth"
import {EntityRef} from "declare-common"

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
    },

    async addItemToCategory({id, itemID}, {user}) {
        const category = await Category.findByid(id)

        // Ensure user has access to category
        accountAuth(user, category, {
            entityName: "Category"
        })

        // Ensure user has access to item
        let entity
        switch(category.itemRef) {
            case EntityRef.page:
                entity = await Page.findById(itemID)
                break
            case EntityRef.element:
                entity = await Element.findById(itemID)
                break
            case EntityRef.inputType:
                entity = await InputType.findById(itemID)
                break
        }
        accountAuth(user, entity, {
            entityName: category.itemRef
        })

        // Add item to category
        category.items = category.items
            .concat([itemID])
        await category.save()

        return category
    },

    async removeItemFromCategory({id, itemID}, {user}) {
        const category = await Category.findByid(id)

        // Ensure user has access to category
        accountAuth(user, category, {
            entityName: "Category"
        })

        // Remove item from category
        category.items = category.items
            .filter(iid => iid !== itemID)
        await category.save()

        return category
    }
}

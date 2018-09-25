import Product     from "../model/Product"
import Category    from "../model/Category"
import accountAuth from "./validation/accountAuth"

export default {
    products({user}) {
        accountAuth(user, null, {validateEntity: false})
        
        if(user.isSuperAdmin())
            return Product.find({})
        else
            return Product.find({owner: user.owner})
    },

    async product({id}, {user}) {
        const prod = await Product.findById(id)
        accountAuth(user, prod)
        return prod
    },

    /*
     * Mutations
     */

    createProduct({product}, {user}) {
        accountAuth(user, null, {validateEntity: false})

        product.owner = product.owner || user.owner

        // Validate account
        // TODO: Just checking it exists
        if(!product) {
            throw {
                message: "Product is not valid."
            }
        }

        return new Product(product).save()
    },

    async addCategory({productID, categoryID}, {user}) {
        const product  = await Product.findById(productID)
        const category = await Category.findById(categoryID)

        accountAuth(user, product)
        accountAuth(user, category)

        // Add category ID to product's correct category array,
        // given the itemRef
        try {
            product[`${category.itemRef}Categories`] = product[`${category.itemRef}Categories`].concat([categoryID])
        } catch(ex) {
            throw {
                message: `Unknown itemRef "${category.itemRef}".`
            }
        }
        // Save to db
        await product.save()

        return product
    }
}

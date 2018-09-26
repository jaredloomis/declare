import Product     from "../model/Product"
import Category    from "../model/Category"
import Environment from "../model/Environment"
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

    async createProduct({product}, {user}) {
        accountAuth(user, null, {validateEntity: false})

        // Validate account
        // TODO: Just checking it exists
        if(!product) {
            throw {
                message: "Product is not valid."
            }
        }

        product.owner = product.owner || user.owner

        // Create an environment if none specified
        if(!product.defaultEnvironment) {
            const env = Environment.defaultEnvironment(product)
            await env.save()
            product.defaultEnvironment = env._id
        }

        return new Product(product).save()
    },

    async updateProduct({id, product}, {user}) {
        const productModel = await Product.findById(id)
        accountAuth(user, productModel, {
            entityName: "Product"
        })
        await productModel.update(product)
        return Product.findById(id)
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

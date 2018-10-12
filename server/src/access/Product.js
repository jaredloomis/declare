import {Product}     from "declare-db"
import {Category}    from "declare-db"
import {Environment} from "declare-db"
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

        const productModel = new Product(product)
        await productModel.save()

        // Create a root Element category
        const elementsCat = new Category({
            name: `${product.name} Elements`,
            items: [],
            itemRef: "element",
            product: productModel._id,
            owner: productModel.owner
        })
        await elementsCat.save()

        // Create a root Page category
        const pagesCat = new Category({
            name: `${product.name} Pages`,
            items: [],
            itemRef: "page",
            product: productModel._id,
            owner: productModel.owner
        })
        await pagesCat.save()

        // Add root categories to product
        productModel.elementCategories = productModel.elementCategories
            .concat([elementsCat._id])
        productModel.pageCategories = productModel.pageCategories
            .concat([pagesCat._id])
        await productModel.save()

        return productModel
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

import Product  from "../model/Product"
import Category from "../model/Category"

export default {
    products({user}) {
        // Check if user has access
        if(!user) {
            throw {
                message: "Must be logged in to access products."
            }
        }
        
        if(user.isSuperAdmin())
            return Product.find({})
        else
            return Product.find({owner: user.owner})
    },

    async product({id}, {user}) {
        const prod = await Product.findById(id)

        // Check if report exists with id
        if(!prod) {
            throw {
                message: `Product not found with id \"${id}\"`
            }
        }
        // Check if user has access
        if(!(user && (user.owner.equals(prod.owner) || user.isSuperAdmin()))) {
            throw {
                message: "Cannot access products not in your account."
            }
        }

        return prod
    },

    /*
     * Mutations
     */

    createProduct({product}, {user}) {
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

        // Ensure productID is valid
        if(!product) {
            throw {
                message: `No product found with ID ${productID}.`
            }
        }

        // Ensure categoryID is valid
        if(!category) {
            throw {
                message: `No category found with ID ${categoryID}.`
            }
        }

        // Check if user has access to product
        if(!(user && (user.owner.equals(product.owner) || user.isSuperAdmin()))) {
            throw {
                message: "You don't have permission to modify this product."
            }
        }

        // Check if user has access to page
        if(!(user && (user.owner.equals(category.owner) || user.isSuperAdmin()))) {
            throw {
                message: "You don't have permission to modify this category."
            }
        }

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

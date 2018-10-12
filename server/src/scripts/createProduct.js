import mongoose from "mongoose"
import {Product} from "declare-db"

mongoose.Promise = require("bluebird")

async function createProduct() {
    try {
        const product = new Product({
            name: "uAccept",
            pageCategories: ["5a9dc56e70cd2a298769f323"],
            elementCategories: ["5a9f8630cb22e477a1f06f97"],
            inputTypeCategories: ["5aaf1bc60953f80578ffe4a3"]
        })
        await product.save()
        console.log("Saved!")
        return Product.find({}).then(console.log)
    } catch(ex) {
        console.log(ex)
    }
}

createProduct()

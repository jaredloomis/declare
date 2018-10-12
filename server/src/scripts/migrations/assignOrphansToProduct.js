// This migration adds "product" property to any
// Pages, Elements, or InputTypes with none set
//
// Usage: node assignOrphansToProduct.js [productID]
import mongoose  from "../scriptDb"

import {Page}      from "declare-db"
import {Element}   from "declare-db"
import {InputType} from "declare-db"

const product = process.argv[2]
console.log(`Assigning orphaned models to product "${product}".`)

const query = {
    product: {$exists: false}
}

async function assignOrphan(model) {
    console.log(`Assigning ${model.name || model._id} to product.`)
    try {
        model.product = product
        return model.save()
    } catch(ex) {
        console.err(`FAILED ${model.name || model._id}`)
    }
}

async function assignOrphansToProduct() {
    console.log("called")
    const prods = await Page.find(query).then
    console.log("found")
    const elems = await Element.find(query)
    const inTys = await InputType.find(query)

    console.log("Assigning products.")
    for(const prod of prods) {
        await assignOrphan(prod)
    }
    console.log("Assigning elements.")
    for(const elem of elems) {
        await assignOrphan(elem)
    }
    console.log("Assigning input types.")
    for(const inTy of inTys) {
        await assignOrphan(inTys)
    }
}

assignOrphansToProduct()
    .then(() => console.log("Done!"))
    .catch(ex => {
        console.log("Exception Raised!")
        console.log(ex)
    })

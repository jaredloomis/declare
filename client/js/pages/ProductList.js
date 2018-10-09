import React from "react"

import Title                from "../components/base/Title"
import Section              from "../components/base/Section"
import Container            from "../components/base/Container"
import ProductListContainer from "../containers/ProductList"

const ProductList = () => <Section><Container>
    <Title>Products</Title>
    <br/>
    <ProductListContainer/>
</Container></Section>

ProductList.displayName = "ProductListPage"
export default ProductList

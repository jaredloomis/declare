import React from "react"

import Title       from "../components/base/Title"
import Section     from "../components/base/Section"
import Container   from "../components/base/Container"
import ProductList from "../containers/ProductList"

const Dashboard = () => <Section><Container>
    <Title>Products</Title>
    <br/>
    <ProductList/>
</Container></Section>

Dashboard.displayName = "Dashboard"
export default Dashboard

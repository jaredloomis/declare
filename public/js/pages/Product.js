import React from "react"
import {
    compose, setDisplayName, lifecycle
} from "recompose"

import {listProducts}    from "../actions/Product"

import Title             from "../components/base/Title"
import Breadcrumb        from "../components/base/Breadcrumb"
import Container         from "../components/base/Container"
import Section           from "../components/base/Section"
import Link              from "../components/base/Link"
import Heading           from "../components/base/Heading"
import ProductContainer  from "../containers/Product"
import withReduxState    from "../containers/WithReduxState"
import withReduxDispatch from "../containers/WithReduxDispatch"

const Product = props => {
    const product = props.products && props.products[props.productID]

    const crumbs = product && [
        {text: "Products", url: "#/Products"},
        {text: product.name}
    ]

    return <Section><Container>
        <Breadcrumb crumbs={crumbs}/>
        <Title>{product && product.name}</Title><br/>
        <ProductContainer {...props}/>
    </Container></Section>
}

const enhance = compose(
    withReduxState(["products"]),
    withReduxDispatch({
        listProducts
    }),
    lifecycle({
        componentWillMount() {
            this.props.listProducts()
        }
    }),
    setDisplayName("ProductPage")
)

export default enhance(Product)

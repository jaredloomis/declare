import React            from "react"
import {setDisplayName} from "recompose"

import Link             from "./base/Link"
import Button           from "./base/Button"

const ProductList = ({products=[], onCreate}) => {
    return <div>
        {Object.keys(products).map(id =>
            <Link to={`#/Product/${id}`} key={id}>{products[id].name}</Link>
        )}
        <Button type="info" onClick={onCreate}>Create</Button>
    </div>
}

const enhance = setDisplayName("ProductList")

export default enhance(ProductList)

import React            from "react"
import {setDisplayName} from "recompose"

import Link             from "./base/Link"
import Button           from "./base/Button"
import List             from "./base/List"

const ProductList = ({products=[], onCreate}) => {
    return <div>
        <List>
            {Object.keys(products).map(id =>
                <Link to={`#/Product/${id}`} key={id}>
                    {products[id].name}
                </Link>
            )}
        </List>
        <br/>
        <Button type="info" onClick={onCreate}>Create</Button>
    </div>
}

const enhance = setDisplayName("ProductList")

export default enhance(ProductList)

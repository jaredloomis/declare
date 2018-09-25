import React            from "react"
import {setDisplayName} from "recompose"

import Row              from "./base/Row"
import Column           from "./base/Column"
import Link             from "./base/Link"
import Button           from "./base/Button"
import List             from "./base/List"

const ProductList = ({products=[], focusProduct, onCreate, onActivate}) => {
    return <div>
        {!Object.keys(products).length ?
            <span>No products yet! Please create a product.</span> :
            !focusProduct && <span>
                No product currently active! Please activate a product.
            </span>
        }
        <List>
            {Object.keys(products).map(id =>
                <Row key={id}>
                    <Column size="10">
                        <Link to={`#/Product/${id}`} key={id}>
                            {products[id].name}
                        </Link>
                    </Column>
                    <Column>
                        <Button type="primary" onClick={() => onActivate(id)}>
                            Activate
                        </Button>
                    </Column>
                </Row>
            )}
        </List>
        <br/>
        <Button type="info" onClick={onCreate}>Create</Button>
    </div>
}

const enhance = setDisplayName("ProductList")

export default enhance(ProductList)

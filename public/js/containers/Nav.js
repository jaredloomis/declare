import React from "react"
import {compose, setDisplayName} from "recompose"

import Nav               from "../components/Nav"

import {setFocusProduct} from "../actions/Product"
import withReduxDispatch from "./WithReduxDispatch"

const NavBase = props => {
    return <Nav onSelectFocusProduct={props.setFocusProduct}/>
}

const enhance = compose(
    withReduxDispatch({
        setFocusProduct: {
            parameterized: setFocusProduct
        }
    }),
    setDisplayName("NavContainer")
)

export default enhance(NavBase)

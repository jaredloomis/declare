import React from "react"
import {compose, setDisplayName, lifecycle} from "recompose"

import Nav               from "../components/Nav"

import {
    fetchUser, setFocusProduct
} from "../actions/User"
import withReduxDispatch from "./WithReduxDispatch"
import withReduxState    from "./WithReduxState"

const NavBase = props => {
    const user = props.users[Object.keys(props.users)[0]]
    return <Nav focusProduct={user && user.focusProduct}
                onSelectFocusProduct={props.setFocusProduct}/>
}

const enhance = compose(
    withReduxState(["users"]),
    withReduxDispatch({
        setFocusProduct: {
            parameterized: setFocusProduct
        },
        fetchUser: {
            parameterized: fetchUser
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.fetchUser(null/*this.props.tokens[this.props.activeToken].user*/)
        }
    }),
    setDisplayName("NavContainer")
)

export default enhance(NavBase)

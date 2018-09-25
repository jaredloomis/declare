import React from "react"
import {compose, setDisplayName, lifecycle} from "recompose"

import Nav               from "../components/Nav"

import {
    fetchUser, setFocusProduct, setActiveUser
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
        },
        setActiveUser: {
            parameterized: setActiveUser
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.fetchUser(null)
            .then(user =>
                user && this.props.setActiveUser(user._id)
            )
        }
    }),
    setDisplayName("NavContainer")
)

export default enhance(NavBase)

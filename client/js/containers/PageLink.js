import React from "react"
import {
    compose, lifecycle, setDisplayName, withProps
} from "recompose"

import {listPages}  from "../actions/Page"

import Link from "../components/base/Link"

import withReduxState       from "./WithReduxState"
import withReduxDispatch    from "./WithReduxDispatch"

const enhance = compose(
    withReduxState(["pages"]),
    withReduxDispatch({
        listPages
    }),
    withProps(props => {
        const page = props.pages[props.pageID] || {}

        return {
            to: `#/Page/${props.pageID}`,
            children: page.name
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.listPages()
        }
    })
)

export default enhance(Link)

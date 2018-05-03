import React from "react"
import {
    compose, setDisplayName
} from "recompose"

import withReduxDispatch from "./WithReduxDispatch"

import PageAddComponent from "../components/PageAdd"
import {createPage} from "../actions/Page"

const PageAddBase = props => {
    const create = name => {
        props.createPage(name, props.productID)
        .then(props.onCreate || (() => {}))
    }

    return <PageAddComponent onCreatePage={create}/>
}

const enhance = compose(
    withReduxDispatch({
        createPage: {
            parameterized: createPage
        }
    }),
    setDisplayName("PageAdd")
)

export default enhance(PageAddBase)

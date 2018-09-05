import React from "react"
import {compose, setDisplayName, withProps, lifecycle} from "recompose"

import {
    fetchPage, listPages, addLink, removeLink,
    updateLinkAction, addLinkAction, insertLinkAction,
    removeLinkAction, updateLinkDest
} from "../actions/Page"

import {
    listElements
} from "../actions/Element"

import LinkComponent     from "../components/Link"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const LinkBase = props => {
    const page = props.pages && props.pages[props.pageID]

    const actionChange = (actionI, action) =>
        props.updateLinkAction(props.pageID, props.linkI, actionI, action)
    const actionAdd    = () =>
        props.addLinkAction(props.pageID, props.linkI)
    const actionRemove = actionI =>
        props.removeLinkAction(props.pageID, props.linkI, actionI)
    const actionInsert = actionI =>
        props.insertLinkAction(props.pageID, props.linkI, actionI)
    const destChange   = newDest =>
        props.updateLinkDest(props.pageID, props.linkI, newDest)
    const remove       = () =>
        props.removeLink(props.pageID, props.linkI)

    if(props.defaultValue) {
        return <LinkComponent productID={page && page.product}
                onActionChange={actionChange}
                onDestChange={destChange}
                onActionRemove={actionRemove}
                onActionAdd={actionAdd}
                onActionInsert={actionInsert}
                onRemove={remove}
                {...props}/>
    } else {
        return <span>Loading...</span>
    }
}

const enhance = compose(
    withReduxDispatch({
        updateLinkDest: {
            parameterized: updateLinkDest
        },
        removeLinkAction: {
            parameterized: removeLinkAction
        },
        insertLinkAction: {
            parameterized: insertLinkAction
        },
        addLinkAction: {
            parameterized: addLinkAction
        },
        updateLinkAction: {
            parameterized: updateLinkAction
        },
        removeLink: {
            parameterized: removeLink
        },
        fetchPage: {
            parameterized: fetchPage
        },
        listPages,
        listElements,
        addLink: {
            parameterized: addLink
        }
    }),
    withReduxState(["pages"]),
    withProps(props => {
        const page = props.pages && props.pages[props.pageID]
        if(page && page.links) {
            return {
                defaultValue: page.links[props.linkI]
            }
        }
    }),
    setDisplayName("LinkContainer"),
    lifecycle({
        componentDidMount() {
            this.props.listPages()
            this.props.listElements()
        }
    })
)

export default enhance(LinkBase)

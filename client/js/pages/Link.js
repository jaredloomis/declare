import React from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {
    saveLinks, fetchPage, listPages
} from "../actions/Page"

import Container         from "../components/base/Container"
import Section           from "../components/base/Section"
import Breadcrumb        from "../components/base/Breadcrumb"
import Button            from "../components/base/Button"
import withReduxState    from "../containers/WithReduxState"
import withReduxDispatch from "../containers/WithReduxDispatch"
import LinkContainer     from "../containers/Link"

const LinkBase = props => {
    const page = props.pages && props.pages[props.pageID]
    const link = page && page.links ? page.links[props.linkI] : null
    const dest = props.pages[link ? link.destination : null]

    const save = () => props.saveLinks(props.pageID)

    const crumbs = page && dest && [
        {text: "Pages", url: "#/Pages"},
        {text: page.name, url: `#/Page/${page._id}`},
        {text: `Link To: ${dest.name}`}
    ]

    return <Section><Container>
        <Breadcrumb crumbs={crumbs}/>
        <LinkContainer {...props}/>
        <Button type="primary" onClick={save}>Save</Button>
    </Container></Section>
}

const enhance = compose(
    withReduxDispatch({
        saveLinks: {
            parameterized: saveLinks
        },
        fetchPage: {
            parameterized: fetchPage
        },
        listPages
    }),
    withReduxState(["pages"]),
    lifecycle({
        componentDidMount() {
            this.props.listPages()
            this.props.fetchPage(this.props.pageID)
        }
    }),
    setDisplayName("LinkPage")
)

export default enhance(LinkBase)

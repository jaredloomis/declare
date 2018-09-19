import React from "react"
import {
    compose, lifecycle, setDisplayName, withState
} from "recompose"

import {listPages, createPage} from "../actions/Page"
import {listCategories}        from "../actions/Category"

import Container               from "../components/base/Container"
import Section                 from "../components/base/Section"
import Row                     from "../components/base/Row"
import Column                  from "../components/base/Column"
import Button                  from "../components/base/Button"
import Heading                 from "../components/base/Heading"
import FeatherIcon             from "../components/base/FeatherIcon"
import Modal                   from "../components/base/Modal"
import Category                from "../containers/Category"
import PageAdd                 from "../containers/PageAdd"

import withReduxState          from "../containers/WithReduxState"
import withReduxDispatch       from "../containers/WithReduxDispatch"

const PageList = props => {
    const openModal  = () => props.setCreateInProgress(true)
    const closeModal = () => props.setCreateInProgress(false)

    const rootCategoryIDs = Object.keys(props.categories).filter(categoryID =>
        props.categories[categoryID] && props.categories[categoryID].itemRef === "page"
    )

    const user      = props.users && props.users[Object.keys(props.users)[0]]
    const productID = user && user.focusProduct

    return <Section><Container>
        <Row>
            <Column size="10">
                <Heading size="2">Pages</Heading>
            </Column>
            <Column size="2">
                <Button type="rounded primary" onClick={openModal}>
                    <FeatherIcon icon="plus" size={16}/>
                </Button>
            </Column>
        </Row>
        {rootCategoryIDs.map(categoryID =>
            <Category categoryID={categoryID} productID={productID} key={categoryID}/>
        )}
        <Modal active={props.createInProgress} onClose={closeModal}>
            <PageAdd productID={productID}/>
        </Modal>
    </Container></Section>
}

const enhance = compose(
    withReduxState(["categories", "users"]),
    withReduxDispatch({
        listPages,
        listCategories,
        createPage: {
            parameterized: createPage
        }
    }),
    withState("createInProgress", "setCreateInProgress", false),
    lifecycle({
        componentDidMount() {
            this.props.listCategories()
            this.props.listPages()
        }
    }),
    setDisplayName("PageListContainer")
)

export default enhance(PageList)

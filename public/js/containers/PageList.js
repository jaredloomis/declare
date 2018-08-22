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
import Title                   from "../components/base/Title"
import FeatherIcon             from "../components/base/FeatherIcon"
import Modal                   from "../components/base/Modal"
import Category                from "./Category"
import PageAdd                 from "./PageAdd"

import withReduxState          from "./WithReduxState"
import withReduxDispatch       from "./WithReduxDispatch"

const PageList = props => {
    const openModal  = () => props.setCreateInProgress(true)
    const closeModal = () => props.setCreateInProgress(false)

    const rootCategoryIDs = Object.keys(props.categories).filter(categoryID =>
        props.categories[categoryID] && props.categories[categoryID].itemRef === "page"
    )

    return <Section><Container>
        <Row>
            <Column size="10">
                <Title size="2">Pages</Title>
            </Column>
            <Column size="2">
                <Button type="rounded primary" onClick={openModal}>
                    <FeatherIcon icon="plus" size={16}/>
                </Button>
            </Column>
        </Row>
        {rootCategoryIDs.map(categoryID =>
            <Category categoryID={categoryID} productID={props.focusProduct} key={categoryID}/>
        )}
        <Modal active={props.createInProgress} onClose={closeModal}>
            <PageAdd productID={props.focusProduct}/>
        </Modal>
    </Container></Section>
}

const enhance = compose(
    withReduxState(["categories", "focusProduct"]),
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
        }
    }),
    setDisplayName("PageListContainer")
)

export default enhance(PageList)

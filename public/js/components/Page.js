import React from "react"
import {
    withState, compose, withProps
} from "recompose"

import Row       from "./base/Row"
import Column    from "./base/Column"
import Section   from "./base/Section"
import Heading   from "./base/Heading"
import Title     from "./base/Title"
import Link      from "./base/Link"
import TextInput from "./base/TextInput"
import Optional  from "./base/Optional"
import Tile  from "./base/Tile"
import FlexGrid  from "./base/FlexGrid"
import FeatherIcon  from "./base/FeatherIcon"

import withReduxState from "../containers/WithReduxState"

/**
 * @prop ...pageModel {Object} Pass in all props of Page db model
 * @prop onInfoChange {Object -> any} callback called when any top-level field changes
 * @prop onViewLink {Number -> any} called back when a Link is clicked on
 * @prop onViewTest {ObjectID -> any} called back when a Test is clicked on
 * @prop onAddLink {() -> any} called back when add link btn is clicked
 * @prop onAddTest {() -> any} called back when add Test btn is clicked
 */
const Page = props => {
    const {
        name, startURL, links, pageCustomTests,
        onInfoChange, onViewLink, onViewTest, onAddLink, onAddTest,
        editingURL, setEditingURL
    } = props

    const urlActiveChange = () => {
        setEditingURL(!editingURL)
        infoChange("startURL")(null)
    }
    const infoChange = key => val => onInfoChange({[key]: val})

    const viewLink = linkI  => () => onViewLink(linkI)
    const viewTest = testID => () => onViewTest(testID)

    return <div>
        <Title
            leftLabel={<span><Link to="#/Pages">Pages</Link>/</span>}
            editable
            onChange={infoChange("name")}>
            {name}
        </Title>
        <Section>
            <Optional text="Is accessible from URL?"
                      isActive={editingURL === null ? startURL && startURL.length : editingURL}
                      onActiveChange={urlActiveChange}>
                <TextInput label="URL" defaultValue={startURL} onChange={infoChange("startURL")}/>
            </Optional>
        </Section>
        <Heading>Links</Heading>
        <Section>
            <FlexGrid width={4}>
                {(links || []).map((link, linkI) => {
                    const dest = props.pages[link.destination]

                    return <Tile overlay={<FeatherIcon icon="eye"/>}
                                 onClick={viewLink(linkI)} key={link.destination}>
                        <FeatherIcon icon="arrow-right" size={16}/> {dest && dest.name}
                    </Tile>
                }).concat([
                    <Tile onClick={onAddLink} key="create-link">
                        <FeatherIcon icon="plus" size={24}/>
                    </Tile>
                ])}
            </FlexGrid>
        </Section>
        <Heading>Tests</Heading>
        <Section>
            <FlexGrid width={4}>
                {(pageCustomTests || []).map(testID => {
                    const test = props.customTests[testID]

                    return <Tile overlay={<FeatherIcon icon="eye"/>}
                                 onClick={viewTest(testID)} key={testID}>
                        <FeatherIcon icon="play" size={16}/> {test && test.name}
                    </Tile>
                }).concat([
                    <Tile onClick={onAddTest} key="create-test">
                        <FeatherIcon icon="plus" size={24}/>
                    </Tile>
                ])}
            </FlexGrid>
        </Section>
    </div>
}

const enhance = compose(
    withState("editingURL", "setEditingURL", props =>
        props.startURL && props.startURL.length ? props.startURL : null
    ),
    withProps(({customTests}) => ({pageCustomTests: customTests})),
    withReduxState(["pages", "customTests"])
)

Page.displayName = "Page"
export default enhance(Page)

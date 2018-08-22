import React from "react"
import {
    compose, setDisplayName, withState
} from "recompose"

import AddonsField               from "../components/base/AddonsField"
import Button            from "../components/base/Button"
import Tabbed            from "../components/base/Tabbed"
import PageAddComponent  from "../components/PageAdd"
import PageSelect  from "./PageSelect"
import {createPage}      from "../actions/Page"
import withReduxDispatch from "./WithReduxDispatch"

const PageAddOrSelectBase = props => {
    const create = name => {
        props.createPage(name, props.productID)
        .then(props.onCreate || (() => {}))
    }

    const select = props.setSelected
    const submitSelect = () => {
        if(props.onSelect) props.onSelect(props.selected)
    }

    return <Tabbed tabs={[
        {
            label: "Select Existing Page",
            component: <AddonsField>
                <PageSelect onChange={select} productID={props.productID}/>
                <Button type="info" onClick={submitSelect}>Select</Button>
            </AddonsField>
        },
        {
            label: "Create New Page",
            component: <PageAddComponent onCreatePage={create}/>
        }
    ]}/>
}

const enhance = compose(
    withReduxDispatch({
        createPage: {
            parameterized: createPage
        }
    }),
    withState("selected", "setSelected", null),
    setDisplayName("PageAddOrSelect")
)

export default enhance(PageAddOrSelectBase)

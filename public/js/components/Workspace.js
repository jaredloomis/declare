import React            from "react"
import {
    setDisplayName, withState, compose
} from "recompose"

import Flexbox     from "./base/Flexbox"
import CategoryNav from "../containers/CategoryNav"

import Title       from "./base/Title"
import Container   from "./base/Container"
import Section     from "./base/Section"
import Page        from "../containers/Page"
import Element     from "../containers/Element"
import InputType   from "../containers/InputType"

const Workspace = ({pages, inputTypes, elements, selection, setSelection}) => {
    const lastSelection = selection[selection.length-1]

    const workView      = (() => {
        const def = <Title>Select an item from the left</Title>

        if(!lastSelection) {
            return def
        } else if(pages && pages[lastSelection]) {
            return <Page pageID={lastSelection}/>
        } else if(elements && elements[lastSelection]) {
            return <Element elementID={lastSelection}/>
        } else if(inputTypes && inputTypes[lastSelection]) {
            return <InputType inputTypeID={lastSelection}/>
        } else {
            return def
        }
    })()

    return <Flexbox>
            <CategoryNav onSelectionChange={setSelection}/>
        <Container><Section>
            <div key={lastSelection}>{workView}</div>
        </Section></Container>
    </Flexbox>
}

const enhance = compose(
    withState("selection", "setSelection", []),
    setDisplayName("Workspace")
)

export default enhance(Workspace)

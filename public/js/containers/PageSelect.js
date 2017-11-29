import React from "react"
import {compose, setDisplayName} from "recompose"

import Select         from "../components/base/Select"
import withReduxState from "./WithReduxState"

const PageSelect = ({pages, defaultValue, onChange}) =>
    <Select label="Destination" onChange={onChange}
            defaultValue={defaultValue}>
        {Object.keys(pages).map(pageID =>
            <span value={pageID} key={pageID}>
                {pages[pageID].name}
            </span>
        )}
    </Select>

const enhance = compose(
    setDisplayName("PageSelect"),
    withReduxState(["pages"])
)

export default enhance(PageSelect)

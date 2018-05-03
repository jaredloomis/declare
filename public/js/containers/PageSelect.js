import React from "react"
import {compose, setDisplayName, lifecycle} from "recompose"

import {listPages}       from "../actions/Page"
import Select            from "../components/base/Select"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const PageSelect = ({productID, defaultValue, onChange, pages}) =>
    <Select label="Page" onChange={onChange}
            defaultValue={defaultValue}>
        {Object.keys(pages)
            .filter(pageID => pages[pageID].product === productID)
            .map(pageID =>
            <span value={pageID} key={pageID}>
                {pages[pageID].name}
            </span>
        )}
    </Select>

const enhance = compose(
    setDisplayName("PageSelect"),
    withReduxState(["pages"]),
    withReduxDispatch({listPages}),
    lifecycle({
        componentDidMount() {
            this.props.listPages()
        }
    })
)

export default enhance(PageSelect)

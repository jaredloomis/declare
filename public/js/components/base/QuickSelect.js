import React from "react"
import {
    withState, setDisplayName, compose
} from "recompose"

import Row       from "./Row"
import Button    from "./Button"
import TextInput from "./TextInput"
import Select    from "./Select"

const QuickSelect = props => {
    const {children, search, setSearch, onChange, onCreate} = props
    const lowerSearch = search.toLowerCase()

    return <Row>
        <TextInput onChange={setSearch} label="Search / Create"/>
        <Button type="info" inline onClick={() => onCreate(search)}>+</Button>
        <Select {...props} onChange={onChange}>
            {children.filter(child =>
                !search || !search.length ||
                child.props.children.toLowerCase().indexOf(lowerSearch) > -1
            )}
        </Select>
    </Row>
}

const enhance = compose(
    withState("search", "setSearch", ""),
    setDisplayName("QuickSelect")
)

export default enhance(QuickSelect)

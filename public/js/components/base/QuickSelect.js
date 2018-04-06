import React from "react"
import {
    withState, setDisplayName, compose
} from "recompose"

import Row         from "./Row"
import AddonsField from "./AddonsField"
import Button      from "./Button"
import TextInput   from "./TextInput"
import Select      from "./Select"

const QuickSelect = props => {
    const {children, search, setSearch, onChange, onCreate} = props
    const lowerSearch = search.toLowerCase()

    const selectableOptions = children.filter(child =>
        !search || !search.length ||
        child.props.children.toLowerCase().indexOf(lowerSearch) > -1
    )

    const actionOption = <AddonsField rawOption key="select-search-create">
        <TextInput onChange={setSearch} label="Search / Create"/>
        <Button type="info" inline onClick={() => onCreate(search)}>+</Button>
    </AddonsField>

    const allOptions = [actionOption, ...selectableOptions]

    return <Select {...props} onChange={onChange}>
            {allOptions/*children.filter(child =>
                !search || !search.length ||
                child.props.children.toLowerCase().indexOf(lowerSearch) > -1
            )*/}
    </Select>
}

const enhance = compose(
    withState("search", "setSearch", ""),
    setDisplayName("QuickSelect")
)

export default enhance(QuickSelect)

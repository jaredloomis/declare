import React          from "react"
import {
    compose, setDisplayName, withState
} from "recompose"

import withReduxDispatch from "./WithReduxDispatch"

import AddonsField from "../components/base/AddonsField"
import TextInput   from "../components/base/TextInput"
import Button      from "../components/base/Button"
import {
    createCategory, setCategoryAsRoot
} from "../actions/Category"

const CategoryAddBase = props => {
    const onAdd = () => {
        props.createCategory({
            name: props.name,
            items: [],
            itemRef: props.itemRef
        }).then(props.onCreate || (() => {}))
            /*.then(category => {
            props.setCategoryAsRoot(category._id, category.itemRef)
        })*/
    }

    return <AddonsField>
        <TextInput label="Name" onChange={props.setName}/>
        <Button type="info" inline onClick={onAdd}>Create Category</Button>
    </AddonsField>
}

const enhance = compose(
    withReduxDispatch({
        createCategory: {
            parameterized: createCategory
        },
        setCategoryAsRoot: {
            parameterized: setCategoryAsRoot
        }
    }),
    withState("name", "setName", ""),
    setDisplayName("CategoryAdd")
)

export default enhance(CategoryAddBase)

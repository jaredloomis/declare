import React          from "react"
import {
    compose, setDisplayName, withState
} from "recompose"

import withReduxDispatch from "./WithReduxDispatch"

import Row       from "../components/base/Row"
import TextInput from "../components/base/TextInput"
import Button    from "../components/base/Button"
import {
    createCategory, setCategoryAsRoot
} from "../actions/Category"

const CategoryAddBase = props => {
    const onAdd = () => {
        props.createCategory({
            name: props.name,
            items: [],
            itemRef: props.itemRef
        }).then(category => 
            props.setCategoryAsRoot(category._id, category.itemRef)
        )
    }

    return <Row>
        <TextInput label="Name" onChange={props.setName}/>
        <Button type="primary" inline onClick={onAdd}>Create Category</Button>
    </Row>
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

import React from "react"

import Box               from "./base/Box"
import Row               from "./base/Row"
import Group             from "./base/Group"
import Column            from "./base/Column"
import Button            from "./base/Button"
import EditableTitle     from "./base/EditableTitle"
import PageSelect        from "../containers/PageSelect"
import InputTypeSelect   from "../containers/InputTypeSelect"
import ElementSelect     from "../containers/ElementSelect"
import CategoryContainer from "../containers/Category"

const Category = props => {
    const {
        _id, parent, name, items=[], itemRef, children=[], onNameChange,
        onItemAdd, onItemChange, onItemRemove, onChildAdd, onRemove
    } = props
    // Event handlers
    const nameChange = event => onNameChange(event.target.value)

    // Rendering
    const itemsDOM = items.map((item, i) => {
        const key = item ? item+i : i
        if(itemRef.toLowerCase() === "page") {
            return <Row key={key}>
                <Column size="10">
                    <PageSelect defaultValue={item} key={key}
                            onChange={newItem => onItemChange(i, newItem)}/>
                </Column>
                <Column size="2">
                    <Button type="danger "onClick={() => onItemRemove(i)}>
                        Remove
                    </Button>
                </Column>
            </Row>
        } else if(itemRef.toLowerCase() === "inputtype") {
            return <Row key={key}>
                <Column size="10">
                    <InputTypeSelect defaultValue={item} key={key}
                            onChange={newItem => onItemChange(i, newItem)}/>
                </Column>
                <Column size="2">
                    <Button type="danger" onClick={() => onItemRemove(i)}>
                        Remove
                    </Button>
                </Column>
            </Row>
        } else if(itemRef.toLowerCase() === "element") {
            return <Row key={key}>
                <Column size="10">
                    <ElementSelect defaultValue={item} key={key}
                            onChange={newItem => onItemChange(i, newItem)}/>
                </Column>
                <Column size="2">
                    <Button type="danger" onClick={() => onItemRemove(i)}>
                        Remove
                    </Button>
                </Column>
            </Row>
        } else {
            return <span key={key}>Unknown itemRef!</span>
        }
    })

    const childrenDOM = children.map(child =>
        <Box key={child}>
            <CategoryContainer categoryID={child}/>
        </Box>
    )

    return <div>
        <EditableTitle size="4" onChange={nameChange}>
            {name}
        </EditableTitle>
        {itemsDOM}
        <Group>
            <Button type="info" onClick={onItemAdd}>+ Add Item to Category</Button>
            <Button type="info" onClick={onChildAdd}>+ Create Subcategory</Button>
            <Button type="danger outlined" onClick={onRemove}>Delete Category</Button>
        </Group>
        {childrenDOM}
    </div>
}

Category.displayName = "Category"
export default Category

import React from "react"

import Box               from "./base/Box"
import Row               from "./base/Row"
import Group             from "./base/Group"
import Column            from "./base/Column"
import Button            from "./base/Button"
import FeatherIcon       from "./base/FeatherIcon"
import EditableHeading     from "./base/EditableHeading"
import PageSelect        from "../containers/PageSelect"
import InputTypeSelect   from "../containers/InputTypeSelect"
import ElementSelect     from "../containers/ElementSelect"
import CategoryContainer from "../containers/Category"

const Category = props => {
    const {
        _id, parent, name, items=[], itemRef, children=[],
        productID, onNameChange,
        onItemAdd, onItemChange, onItemRemove, onChildAdd, onRemove,
        onView
    } = props

    // Rendering
    const itemsDOM = items.map((item, i) => {
        const key = item ? item+i : i
        if(itemRef.toLowerCase() === "page") {
            return <Row key={key}>
                <Column size="8">
                    <PageSelect productID={productID}
                            defaultValue={item} key={key}
                            onChange={newItem => onItemChange(i, newItem)}/>
                </Column>
                <Column size="2">
                    <FeatherIcon icon="link" onClick={() => onView(item)}/>
                </Column>
                <Column size="2">
                    <Button type="danger" inline onClick={() => onItemRemove(i)}>
                        Remove
                    </Button>
                </Column>
            </Row>
        } else if(itemRef.toLowerCase() === "inputtype") {
            return <Row key={key}>
                <Column size="8">
                    <InputTypeSelect productID={productID}
                            defaultValue={item} key={key}
                            onChange={newItem => onItemChange(i, newItem)}/>
                </Column>
                <Column size="2">
                    <FeatherIcon icon="link" onClick={() => onView(item)}/>
                </Column>
                <Column size="2">
                    <Button type="danger" inline onClick={() => onItemRemove(i)}>
                        Remove
                    </Button>
                </Column>
            </Row>
        } else if(itemRef.toLowerCase() === "element") {
            return <Row key={key}>
                <Column size="8">
                    <ElementSelect productID={productID}
                            defaultValue={item} key={key}
                            onChange={newItem => onItemChange(i, newItem)}/>
                </Column>
                <Column size="2">
                    <FeatherIcon icon="link" onClick={() => onView(item)}/>
                </Column>
                <Column size="2">
                    <Button type="danger" inline onClick={() => onItemRemove(i)}>
                        Remove
                    </Button>
                </Column>
            </Row>
        } else {
            return <span key={key}>Unknown itemRef! {itemRef}</span>
        }
    })

    const childrenDOM = children.map(child =>
        <Box key={child}>
            <CategoryContainer categoryID={child}/>
        </Box>
    )

    return <div>
        <EditableHeading size="4" onChange={onNameChange}>
            {name}
        </EditableHeading>
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

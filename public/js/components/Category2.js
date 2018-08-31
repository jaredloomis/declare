import React from "react"

import Link              from "./base/Link"
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

import style from "../../style/Category.scss"

const Category = props => {
    const {
        _id, parent, name, items=[], itemRef, children=[],
        productID, onNameChange,
        onItemAdd, onItemChange, onItemRemove, onChildAdd, onRemove,
        onView,
        store
    } = props

    // Rendering
    const itemsDOM = items.map((item, i) => {
        const key = item ? item+i : i
        if(itemRef.toLowerCase() === "page") {
            return <Row key={key}>
                <Column size="10">
                    <Link to={`#/Page/${item}`}>
                        {(store && store[item] && store[item].name) || "Loading..."}
                    </Link>
                    {/*
                    <PageSelect productID={productID}
                            defaultValue={item} key={key}
                            onChange={newItem => onItemChange(i, newItem)}/>
                            */}
                </Column>
                <Column size="2">
                    <Button type="danger" onClick={() => onItemRemove(i)}>
                        <FeatherIcon icon="trash" size={16}/>
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
                    <Button type="danger" onClick={() => onItemRemove(i)}>
                        <FeatherIcon icon="trash" size={16}/>
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
                    <Button type="danger outlined" onClick={() => onItemRemove(i)}>
                        <FeatherIcon icon="trash" size={16}/>
                    </Button>
                </Column>
            </Row>
        } else {
            return <span key={key}>Unknown itemRef! {itemRef}</span>
        }
    }).map((dom, i) =>
        <div className={style.item} key={items[i] || i}>{dom}</div>
    )

    const childrenDOM = children.map((child, i) =>
        <div className={style.child} key={items[i] || i}>
            <CategoryContainer categoryID={child} productID={productID}/>
        </div>
    )

    return <div className={style.wrapper}>
        <div className={style.titleBar}>
        <Row>
            <Column size="10">
                <EditableHeading size="5" onChange={onNameChange}>
                    {name}
                </EditableHeading>
            </Column>
            <Column size="2">
                <div className={style.itemActions}>
                    <Group>
                        <Button type="small" onClick={onItemAdd}>
                            <FeatherIcon icon="plus" size={16}/>
                        </Button>
                        <Button type="small" onClick={onChildAdd}>
                            <FeatherIcon icon="folder" size={16}/>
                        </Button>
                        <Button type="small danger outlined" onClick={onRemove}>
                            <FeatherIcon icon="trash" size={16}/>
                        </Button>
                    </Group>
                </div>
            </Column>
        </Row>
        </div>
        <div className={style.items}>{itemsDOM}</div>
        <div className={style.children}>{childrenDOM}</div>
    </div>
}

Category.displayName = "Category"
export default Category

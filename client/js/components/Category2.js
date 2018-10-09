import React from "react"
import {
    compose, setDisplayName, withState,
    withHandlers
} from "recompose"

import Link              from "./base/Link"
import Row               from "./base/Row"
import Group             from "./base/Group"
import Column            from "./base/Column"
import Button            from "./base/Button"
import Modal             from "./base/Modal"
import FeatherIcon       from "./base/FeatherIcon"
import EditableHeading   from "./base/EditableHeading"
import InputTypeSelect   from "../containers/InputTypeSelect"
import ElementSelect     from "../containers/ElementSelect"
import CategorySelect    from "../containers/CategorySelect"
import CategoryContainer from "../containers/Category"

import style from "../../style/Category.scss"

const Category = props => {
    const {
        _id, parent, name, items=[], itemRef, children=[],
        productID, onNameChange,
        onItemSelect,
        onItemAdd, onItemRemove, onChildAdd, onRemove,
        onItemMove,
        store,
        setState, state
    } = props

    // Rendering
    const itemsDOM = items.map((item, i) => {
        const key = item ? item+i : i

        return <div className={style.item} key={items[i] || i}>
                <Row key={key}>
                <Column size="10">
                    <Link onClick={() => onItemSelect(item)}>
                        {(store && store[item] && store[item].name) || "Loading..."}
                    </Link>
                </Column>
                <Column size="2">
                    <div className={style.itemActions}>
                        <Group>
                        <Button type="info" onClick={() => setState({movingItem: i})}>
                            <FeatherIcon icon="move" size={16}/>
                        </Button>
                        {/*<Button type="danger" onClick={() => onItemRemove(i)}>
                            <FeatherIcon icon="trash" size={16}/>
                        </Button>*/}
                        </Group>
                    </div>
                </Column>
            </Row>
        </div>
    })

    const childrenDOM = children.map((child, i) =>
        <div className={style.child} key={items[i] || i}>
            <CategoryContainer categoryID={child} productID={productID}/>
        </div>
    )

    const modalDOM = <Modal active={typeof state.movingItem === "number"}
                            onClose={() => setState({movingItem: null})}>
        <Group>
            <CategorySelect itemRef={itemRef}
                onChange={cat => setState({movingCategory: cat})}/>
            <Button onClick={() => onItemMove(state.movingItem, state.movingCategory)}>
                Move
            </Button>
        </Group>
    </Modal>

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
        {modalDOM}
    </div>
}

const enhance = compose(
    withState("state", "_setState", {}),
    withHandlers({
        setState: props => update => {
            props._setState({
                ...props.state,
                ...update
            })
        }
    }),
    setDisplayName("Category")
)

export default enhance(Category)

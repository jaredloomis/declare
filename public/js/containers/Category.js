import React          from "react"
import {
    lifecycle, compose, setDisplayName, withState
} from "recompose"

import Modal             from "../components/base/Modal"
import CategoryComponent from "../components/Category"
import {
    fetchCategory, saveCategory, addItemToCategory,
    updateCategoryItem, updateCategoryName, removeCategoryItem,
    createCategory, removeCategory
} from "../actions/Category"
import PageAdd           from "./PageAdd"
import ElementAdd        from "./ElementAdd"
import InputTypeAdd      from "./InputTypeAdd"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const CategoryBase = props => {
    const {categories, categoryID, productID,
           isAdding, setAdding} = props
    const category = categories[categoryID]
    const itemRef  = category && category.itemRef.toLowerCase()

    // XXX manually saves after itemChange. Lots of network traffic
    // Event listeners
    const save       = ()   => props.saveCategory(categoryID)
    const nameChange = name => {
        props.updateCategoryName(categoryID, name)
        save()
    }
    const itemAdd    = ()   => {
        setAdding(true)
    }
    const itemChange = (i, item) => {
        // TODO buffer changes or something
        props.updateCategoryItem(categoryID, i, item)
        save()
    }
    const itemRemove = i => {
        props.removeCategoryItem(categoryID, i)
        save()
    }
    const childAdd = () => {
        props.createCategory({
            parent:  categoryID,
            name:    "CHANGE CATEGORY NAME",
            items:   [],
            itemRef: category.itemRef
        })
    }
    const remove = () => {
        props.removeCategory(categoryID)
    }
    const adderClose = () => {
        setAdding(false)
    }
    const onItemCreated = item => {
        props.addItemToCategory(categoryID, item._id)
        save()
    }
    const viewItem = itemID => {
        window.location.hash =
            itemRef === "page"      ? `/Page/${itemID}`      :
            itemRef === "element"   ? `/Element/${itemID}`   :
            itemRef === "inputtype" ? `/InputType/${itemID}` :
            window.location.hash
    }

    // Render
    return <div>
        <CategoryComponent {...category}
                onNameChange={nameChange}
                onItemAdd={itemAdd}
                onItemChange={itemChange}
                onItemRemove={itemRemove}
                onChildAdd={childAdd}
                onRemove={remove}
                onView={viewItem}
                productID={productID}/>
        <Modal type="info" onClose={adderClose} active={isAdding}>{
            itemRef === "page"      ? <PageAdd      productID={productID} onCreate={onItemCreated}/> :
            itemRef === "element"   ? <ElementAdd   productID={productID} onCreate={onItemCreated}/> :
            itemRef === "inputtype" ? <InputTypeAdd productID={productID} onCreate={onItemCreated}/> :
            <span>Unknown itemRef {itemRef}</span>
        }</Modal>
    </div>
}

const enhance = compose(
    withReduxDispatch({
        fetchCategory: {
            parameterized: fetchCategory
        },
        addItemToCategory: {
            parameterized: addItemToCategory
        },
        saveCategory: {
            parameterized: saveCategory
        },
        updateCategoryItem: {
            parameterized: updateCategoryItem
        },
        updateCategoryName: {
            parameterized: updateCategoryName
        },
        removeCategoryItem: {
            parameterized: removeCategoryItem
        },
        createCategory: {
            parameterized: createCategory
        },
        removeCategory: {
            parameterized: removeCategory
        }
    }),
    withReduxState(["categories"]),
    withState("isAdding", "setAdding", false),
    lifecycle({
        componentDidMount() {
            if(!this.props.categories[this.props.categoryID])
                this.props.fetchCategory(this.props.categoryID)
        }
    }),
    setDisplayName("CategoryContainer")
)

export default enhance(CategoryBase)

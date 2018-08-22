import React          from "react"
import {
    lifecycle, compose, setDisplayName, withState
} from "recompose"

import Modal             from "../components/base/Modal"
import CategoryComponent from "../components/Category2"
import {
    fetchCategory, saveCategory, addItemToCategory,
    updateCategoryItem, updateCategoryName, removeCategoryItem,
    createCategory, removeCategory
} from "../actions/Category"
import PageAddOrSelect           from "./PageAddOrSelect"
import ElementAdd        from "./ElementAdd"
import InputTypeAdd      from "./InputTypeAdd"
import CategoryCreate    from "./CategoryCreate"
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
        setAdding("item")
    }
    const childAdd   = ()   => {
        setAdding("category")
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
    const onCategoryCreated = () => {
        props.createCategory({
            parent:  categoryID,
            name:    "NEW CATEGORY",
            items:   [],
            itemRef: category.itemRef
        })
    }
    const remove = () => {
        props.removeCategory(categoryID)
    }
    const adderClose = () => {
        setAdding(null)
    }
    const onItemCreated = item => {
        props.addItemToCategory(categoryID, item._id)
        save()
        adderClose()
    }
    const onItemSelected = itemID => {
        props.addItemToCategory(categoryID, itemID)
        save()
        adderClose()
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
                productID={productID}
                store={props.pages}/>
        <Modal type="info" onClose={adderClose} active={isAdding === "item"}>{
            itemRef === "page"      ? <PageAddOrSelect productID={productID} onCreate={onItemCreated} onSelect={onItemSelected}/> :
            itemRef === "element"   ? <ElementAdd      productID={productID} onCreate={onItemCreated}/> :
            itemRef === "inputtype" ? <InputTypeAdd    productID={productID} onCreate={onItemCreated}/> :
            <span>Unknown itemRef {itemRef}</span>
        }</Modal>
        <Modal type="info" onClose={adderClose} active={isAdding === "category"}>
            <CategoryCreate parent={categoryID} itemRef={category.itemRef} onCreate={adderClose}/>
        </Modal>
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
    withReduxState(["categories", "pages"]),
    withState("isAdding", "setAdding", null),
    lifecycle({
        componentDidMount() {
            if(!this.props.categories[this.props.categoryID])
                this.props.fetchCategory(this.props.categoryID)
        }
    }),
    setDisplayName("CategoryContainer")
)

export default enhance(CategoryBase)

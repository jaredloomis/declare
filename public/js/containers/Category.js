import React          from "react"
import {
    lifecycle, compose, setDisplayName, withState
} from "recompose"

import Heading           from "../components/base/Heading"
import Modal             from "../components/base/Modal"
import Box               from "../components/base/Box"
import CategoryComponent from "../components/Category2"
import {
    fetchCategory, saveCategory, addItemToCategory,
    updateCategoryItem, updateCategoryName, removeCategoryItem,
    createCategory, removeCategory
} from "../actions/Category"
import PageAddOrSelect           from "./PageAddOrSelect"
import ElementAdd        from "./ElementAdd"
import Element           from "./Element"
import InputTypeAdd      from "./InputTypeAdd"
import CategoryCreate    from "./CategoryCreate"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const CategoryBase = props => {
    const {categories, categoryID, productID,
           modal, setModal} = props
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
        setModal({type: "itemadd"})
    }
    const childAdd   = ()   => {
        setModal({type: "categoryadd"})
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
    const modalClose = () => {
        setModal({type: null})
    }
    const onItemCreated = item => {
        props.addItemToCategory(categoryID, item._id)
        save()
        modalClose()
    }
    const onItemSelected = itemID => {
        props.addItemToCategory(categoryID, itemID)
        save()
        modalClose()
    }
    const viewItem = itemID => {
        if(itemRef === "page")
            window.location.hash = `/Page/${itemID}`
        else {
            setModal({type: `${itemRef}view`, itemID})
        }
    }
    const store =
        itemRef === "element"   ? props.elements  :
        itemRef === "inputtype" ? props.inputType :
                                  props.pages

    const modalContents = (() => {
        if(modal.type === "itemadd") {
            return <div>
                <Heading>Add Item</Heading>
                {itemRef === "page"        ?
                <PageAddOrSelect productID={productID} onCreate={onItemCreated} onSelect={onItemSelected}/> :
                   itemRef === "element"   ?
                <ElementAdd      productID={productID} onCreate={onItemCreated}/> :
                   itemRef === "inputtype" ?
                <InputTypeAdd    productID={productID} onCreate={onItemCreated}/> :
                <span>Unknown itemRef {itemRef}</span>}
            </div>
        } else if(modal.type === "categoryadd") {
            return <div>
                <Heading>Create Category</Heading>
                <CategoryCreate parent={categoryID} itemRef={category.itemRef} onCreate={modalClose}/>
            </div>
        } else if(modal.type === "elementview") {
            return <div>
                <Heading>Edit Element</Heading>
                <Element elementID={modal.itemID}/>
            </div>
        }
    })()

    return <div>
        <CategoryComponent {...category}
                onNameChange={nameChange}
                onItemAdd={itemAdd}
                onItemChange={itemChange}
                onItemRemove={itemRemove}
                onChildAdd={childAdd}
                onRemove={remove}
                onItemSelect={viewItem}
                productID={productID}
                store={store}/>
        <Modal type="info" onClose={modalClose} active={modal.type}>
            <Box>
                {modalContents}
            </Box>
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
    withReduxState(["categories", "pages", "elements", "inputTypes"]),
    withState("modal", "setModal", {type: null}),
    lifecycle({
        componentDidMount() {
            if(!this.props.categories[this.props.categoryID])
                this.props.fetchCategory(this.props.categoryID)
        }
    }),
    setDisplayName("CategoryContainer")
)

export default enhance(CategoryBase)

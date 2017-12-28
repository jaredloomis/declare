import React          from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import CategoryComponent from "../components/Category"
import {
    fetchCategory, saveCategory, addItemToCategory,
    updateCategoryItem, updateCategoryName, removeCategoryItem,
    createCategory, removeCategory
} from "../actions/Category"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const CategoryBase = props => {
    const {categories, categoryID} = props
    const category = categories[categoryID]
    const defItem = null
    // XXX manually saves after itemAdd and itemChange. Lots of network traffic
    // Event listeners
    const save       = ()   => props.saveCategory(categoryID)
    const nameChange = name => {
        props.updateCategoryName(categoryID, name)
        save()
    }
    const itemAdd    = ()   => {
        props.addItemToCategory(categoryID, defItem)
        save()
    }
    const itemChange = (i, item) => {
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
    // Render
    return <CategoryComponent {...category}
                onNameChange={nameChange}
                onItemAdd={itemAdd}
                onItemChange={itemChange}
                onItemRemove={itemRemove}
                onChildAdd={childAdd}
                onRemove={remove}/>
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
    lifecycle({
        componentDidMount() {
            if(!this.props.categories[this.props.categoryID])
                this.props.fetchCategory(this.props.categoryID)
        }
    }),
    setDisplayName("CategoryContainer")
)

export default enhance(CategoryBase)

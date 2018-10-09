import React from "react"
import {
    lifecycle, compose, setDisplayName, withState, withHandlers
} from "recompose"

import {
    listElements, createElement
} from "../actions/Element"
import {
    addItemToCategory, saveCategory
} from "../actions/Category"
import {listProducts}    from "../actions/Product"
import Modal             from "../components/base/Modal"
import Button            from "../components/base/Button"
import AddonsField       from "../components/base/AddonsField"
import QuickSelect       from "../components/base/QuickSelect"
import CategorySelect    from "./CategorySelect"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const ElementQuickSelectBase = props => {
    const children = !props.elements ? null :
        Object.keys(props.elements)
            .filter(elemID => props.elements[elemID].product === props.productID)
            .map(elemID =>
                <span value={elemID} key={elemID}>
                    {props.elements[elemID].name}
                </span>
            )

    const createRequested = props.setTemporarySelector

    const temporaryCategoryChange = props.setTemporaryCategory

    const modalClose = () => {
        props.setTemporarySelector(null)
        props.setTemporaryCategory(null)
    }

    const create = () => {
        // Create the actual Element db entity
        const selector = props.state.temporarySelection.selector
        props.createElement({
            selector,
            name: selector,
            product: props.productID
        }).then(el => {
            // Add Element to category
            props.addItemToCategory(
                props.state.temporarySelection.category,
                el._id
            )
            return el
        }).then(el => {
            // Save category
            props.saveCategory(props.state.temporarySelection.category)
            return el
        }).then(el => {
            // Close modal
            props.setTemporarySelector(null)
            props.setTemporaryCategory(null)
            // Trigger onChange
            props.onChange(el._id)
            return el
        })
    }

    return [
        <QuickSelect label={props.label || "Element"} onChange={props.onChange} onCreate={createRequested} {...props} key="1">
            {children}
        </QuickSelect>,
        <Modal active={props.state.temporarySelection.selector} onClose={modalClose} key="2">
            <AddonsField>
                <CategorySelect itemRef="element" onChange={temporaryCategoryChange}/>
                <Button type="primary" inline onClick={create}>Add to category</Button>
            </AddonsField>
        </Modal>
    ]
}

const enhance = compose(
    withReduxDispatch({
        listElements,
        listProducts,
        createElement: {
            parameterized: createElement
        },
        addItemToCategory: {
            parameterized: addItemToCategory
        },
        saveCategory: {
            parameterized: saveCategory
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.listElements()
            this.props.listProducts()
        }
    }),
    withState("state", "setState", {
        temporarySelection: {
            selector:  null,
            category: null
        }
    }),
    withHandlers({
        setTemporarySelector: ({setState, state}) => selector => {
            setState({
                ...state,
                temporarySelection: {
                    ...state.temporarySelection,
                    selector
                }
            })
        },
        setTemporaryCategory: ({setState, state}) => category => {
            setState({
                ...state,
                temporarySelection: {
                    ...state.temporarySelection,
                    category
                }
            })
        }
    }),
    withReduxState(["elements", "products"]),
    setDisplayName("ElementQuickSelect")
)

export default enhance(ElementQuickSelectBase)

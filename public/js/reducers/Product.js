import {
    PRODUCT_CREATE, PRODUCT_FETCH, PRODUCT_LIST, PRODUCT_ADD_CATEGORY
} from "../actions/Types"

export default (state, action) => {
    if(action.type === PRODUCT_CREATE) {
        return {
            ...state,
            products: {
                ...state.products,
                [action.product._id]: action.product
            }
        }
    } else if(action.type === PRODUCT_FETCH) {
        return {
            ...state,
            products: {
                ...state.products,
                [action.id]: action.product
            }
        }
    } else if(action.type === PRODUCT_LIST) {
        return (action.products || []).reduce((st, newProduct) => {
            const currentProduct = state.products[newProduct._id]

            return {
                ...st,
                products: {
                    ...st.products,
                    [newProduct._id]: {
                        ...currentProduct,
                        ...newProduct
                    }
                }
            }
        }, state)
    } else if(action.type === PRODUCT_ADD_CATEGORY) {
        return {
            ...state,
            products: {
                ...state.products,
                [action.product._id]: action.product
            }
        }
    } else {
        return state
    }
}

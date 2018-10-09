import {createSelector} from "reselect"

import {activeUser} from "./User"

const productsS = state => state.products

export const focusProduct = createSelector(
    productsS, activeUser,
    (products, user) => user && products[user.focusProduct]
)

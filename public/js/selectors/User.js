import {createSelector} from "reselect"

const usersS        = state => state.users
const activeUserIDS = state => state.activeUserID

export const activeUser = createSelector(
    usersS, activeUserIDS,
    (users, activeUserID) => users[activeUserID]
)

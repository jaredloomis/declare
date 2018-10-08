// @flow
import gql from "graphql-tag"
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    USER_TOKEN_CREATE, USER_CREATE, USER_ASSIGN,
    USER_SET_FOCUS_PRODUCT, USER_LIST, USER_FETCH,
    USER_SET_ACTIVE
} from "./Types"
import {handleError} from "./Error"
import Fragments from "../graphQL/Fragments"
import {activeUser} from "../selectors/User"
import DError from "../lib/DError"

const fragments = Fragments.user

export const createToken = (accountID: string, authData: any) => async (dispatch: Func, getState) => {
    const tokenRes = await client().mutate({
        mutation: gql`mutation ($account: ID, $email: String, $password: String) {
                token: createToken(account: $account, email: $email, password: $password) {
                    data {
                        _id
                        token
                        expires
                        account
                        user
                    }
                    error
                }
            }`,
        variables: {
            account: accountID,
            ...authData
        }
    })
    const token = tokenRes.data.token.data
    const error = tokenRes.data.token.error

    if(error) {
        throw new DError("Couldn't create token", error)
        //return dispatch(handleError(error, "Couldn't create token."))
    }

    dispatch({
        type: USER_TOKEN_CREATE,
        token
    })

    await dispatch(fetchUser(token.user))

    return token
}

export const createUser = (userInput: any) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    const userRes = await client(token).mutate({
        mutation: gql`mutation ($user: UserInput!) {
                user: createUser(user: $user) {
                    ...FullUser
                }
            }
        
            ${fragments.full}`,
        variables: {user: userInput}
    })
    const res   = userRes.data.user
    const user  = res.data
    const error = res.error

    if(error) {
        return dispatch(handleError(error, "Couldn't create user."))
    }

    dispatch({
        type: USER_CREATE,
        user
    })

    return user
}

export const assignUser = (accountID: string, userID: string) => async (dispatch: Func, getState: Func) => {
    const token = getState().activeToken
    await client(token).mutate({
        mutation: gql`mutation ($accountID: ID!, $userID: ID!) {
                account: assignUser(accountID: $accountID, userID: $userID) {
                    ...FullAccount
                }
            }
        
            ${Fragments.account.full}`,
        variables: {accountID, userID}
    })

    dispatch({
        type: USER_ASSIGN,
        userID, accountID
    })
}

export const setFocusProduct = productID => async (dispatch, getState) => {
    const state  = getState()
    const token  = state.activeToken
    const user   = {...activeUser(state)}
    const userID = user._id
    delete user._id
    delete user.__typename
    delete user.passwordSalt
    await client(token).mutate({
        mutation: gql`mutation ($id: ID!, $user: UserInput!) {
                user: updateUser(id: $id, user: $user) {
                    ...MinimalUser
                }
            }
        
            ${fragments.minimal}`,
        variables: {
            id: userID,
            user: {
                ...user,
                focusProduct: productID
            }
        }
    })

    dispatch({
        type: USER_SET_FOCUS_PRODUCT,
        productID
    })
}

export const listUsers = async (dispatch, getState) => {
    const token = getState().activeToken
    const userRes = await client(token).query({
        query: gql`query {
                users {
                    ...MinimalUserList
                }
            }
        
            ${fragments.minimalList}`
    })
    const res   = userRes.data.users
    const users = res.data
    const error = res.error

    if(error) {
        return dispatch(handleError(error, "Couldn't list users."))
    }

    dispatch({
        type: USER_LIST,
        users
    })

    return users
}

export const fetchUser = id => async (dispatch, getState) => {
    const token = getState().activeToken
    const userRes = await client(token).query({
        query: gql`query($id: ID) {
                user(id: $id) {
                    ...FullUser
                }
            }
        
            ${fragments.full}`,
        variables: {id}
    })
    const res   = userRes.data.user
    const user  = res.data
    const error = res.error

    if(user && !error) {
        dispatch({
            type: USER_FETCH,
            user
        })
    }

    if(error) {
        dispatch(handleError(error, "Couldn't fetch user."))
        //throw error
    }

    return user
}

export const setActiveUser = userID => ({
    type: USER_SET_ACTIVE,
    userID
})

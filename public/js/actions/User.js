// @flow
import gql from "graphql-tag"
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    USER_TOKEN_CREATE, USER_CREATE, USER_ASSIGN, ERROR_DISPLAY_MSG
} from "./Types"
import Fragments from "../graphQL/Fragments"

const fragments = Fragments.user

export const createToken = (accountID: string, authData: any) => async (dispatch: Func) => {
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

    dispatch({
        type: USER_TOKEN_CREATE,
        token
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: error.message
        })
    }
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

    dispatch({
        type: USER_CREATE,
        user
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't create user. ${error.message}`
        })
    }

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

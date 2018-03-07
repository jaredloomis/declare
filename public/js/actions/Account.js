import gql from "graphql-tag"

import client from "../graphQL/Client"
import {
    ACCOUNT_CREATE, ERROR_DISPLAY_MSG
} from "./Types"
import Fragments from "../graphQL/Fragments"

const fragments = Fragments.account

export const createAccount = accountInput => async (dispatch, getState) => {
    const token = getState().activeToken
    const accountRes = await client(token).mutate({
        mutation: gql`
            mutation ($account: AccountInput!) {
                account: createAccount(account: $account) {
                    ...FullAccount
                }
            }
        
            ${fragments.full}`,
        variables: {account: accountInput}
    })
    const res     = accountRes.data.account
    const account = res.data
    const error   = res.error

    dispatch({
        type: ACCOUNT_CREATE,
        account
    })

    if(error) {
        dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't create account. ${error.message}`
        })
    }

    return account
}

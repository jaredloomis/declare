// @flow
import gql from "graphql-tag"
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    USER_TOKEN_CREATE, ERROR_DISPLAY_MSG
} from "./Types"

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
    console.log(tokenRes)
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

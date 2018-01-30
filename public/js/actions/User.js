// @flow
import type {Func} from "../flow"
import client from "../graphQL/Client"
import {
    USER_TOKEN_CREATE
} from "./Types"

export const createToken = (accountID: string, authData: any) => async (dispatch: Func) => {
    const {token} = await client().mutate(`($account: ID, $email: String, $password: String) {
        token: createToken(account: $account, email: $email, password: $password) {
            _id
            token
            expires
            account
            user
        }
    }`, {
        account: accountID,
        ...authData
    })
    dispatch({
        type: USER_TOKEN_CREATE,
        token
    })
}

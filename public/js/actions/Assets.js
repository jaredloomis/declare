// @flow
import gql from "graphql-tag"
import {ASSET_RETRIEVE} from "./Types"
import client from "../graphQL/Client"

import type {Func} from "../flow"

export const retrieveAsset = (key: string) => async (dispatch: Func, getState: Func) => {
    const token   = getState().activeToken
    const {asset} = await client(token).query({
        query: gql`($key: String){
                asset(key: $key)
            }`
    })
    dispatch({
        type: ASSET_RETRIEVE,
        asset, key
    })
}

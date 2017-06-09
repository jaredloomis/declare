// @flow
import {ASSET_RETRIEVE} from "./Types"
import client from "../graphQL/Client"

import type {Func} from "../flow"

export const retrieveAsset = (key: string) => async (dispatch: Func) => {
    const {asset} = await client.query(`($key: String){
        asset(key: $key)
    }`, {key})
    dispatch({
        type: ASSET_RETRIEVE,
        asset, key
    })
}

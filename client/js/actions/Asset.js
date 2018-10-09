// @flow
import gql from "graphql-tag"
import {ASSET_FETCH, ERROR_DISPLAY_MSG} from "./Types"
import client from "../graphQL/Client"

import type {Func} from "../flow"

export const fetchAsset = (key: string) => async (dispatch: Func, getState: Func) => {
    if(!key) return
    const token   = getState().activeToken
    const assetRes = await client(token).query({
        query: gql`query ($key: String!) {
                assetURL(key: $key)
            }`,
        variables: {key}
    })
    const url   = assetRes.data.assetURL
    const error = assetRes.error

    if(error) {
        return dispatch({
            type: ERROR_DISPLAY_MSG,
            message: `Couldn't fetch asset ${key}. ${error.message}`
        })
    }

    dispatch({
        type: ASSET_FETCH,
        url, key
    })
    return url
}

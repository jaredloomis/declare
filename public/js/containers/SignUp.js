import React from "react"
import {compose, setDisplayName} from "recompose"

import SignUpComponent from "../components/SignUp"
import withReduxDispatch from "./WithReduxDispatch"

import {createAccount} from "../actions/Account"
import {createUser, createToken, assignUser} from "../actions/User"

const SignUpBase = props => {
    const submit = async authData => {
        const account = await props.createAccount({
            users: [],
            pageCategories: [],
            elementCategories: [],
            inputTypeCategories: []
        })
        const user = await props.createUser({
            ...authData,
            owner: account._id
        })
        await props.assignUser(account._id, user._id)
        await props.createToken(account._id, authData)
    }

    return <SignUpComponent onSubmit={submit}/>
}

const enhance = compose(
    withReduxDispatch({
        createAccount: {
            parameterized: createAccount
        },
        createToken: {
            parameterized: createToken
        },
        createUser: {
            parameterized: createUser
        },
        assignUser: {
            parameterized: assignUser
        }
    }),
    setDisplayName("SignUpContainer")
)

export default enhance(SignUpBase)

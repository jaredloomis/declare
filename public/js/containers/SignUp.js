import React from "react"
import {compose, setDisplayName} from "recompose"

import SignUpComponent from "../components/SignUp"
import withReduxDispatch from "./WithReduxDispatch"

import {createAccount} from "../actions/Account"
import {createUser, assignUser} from "../actions/User"

const SignUpBase = props => {
    const submit = authData => {
        props.createAccount({
            users: [],
            pageCategories: [],
            elementCategories: [],
            inputTypeCategories: []
        }).then(account =>
            props.createUser({
                ...authData,
                owner: account._id
            }).then(user =>
                props.assignUser(account._id, user._id)
            )
        )

            /*
        props.createUser(authData)
        .then(user =>
            props.createAccount({
                users: [user._id],
                pageCategories: [],
                elementCategories: [],
                inputTypeCategories: []
            })
            .then(account =>
                props.assignUser(account._id, user._id)
            )
        )*/
    }

    return <SignUpComponent onSubmit={submit}/>
}

const enhance = compose(
    withReduxDispatch({
        createAccount: {
            parameterized: createAccount
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

import React          from "react"
import {
    compose, setDisplayName, withState
} from "recompose"

import SignInComponent from "../components/SignIn"
import withReduxDispatch from "./WithReduxDispatch"

import {createToken} from "../actions/User"

const SignInBase = props => {
    const createTokenU = async authData => {
        try {
            await props.createToken(null, authData)
            window.location.hash = "/Products"
        } catch(ex) {
            props.setError("Invalid username or password. Please try again.")
        }
    }

    return <SignInComponent error={props.error} onSubmit={createTokenU}/>
}

const enhance = compose(
    withReduxDispatch({
        createToken: {
            parameterized: createToken
        }
    }),
    withState("error", "setError", null),
    setDisplayName("SignInContainer")
)

export default enhance(SignInBase)

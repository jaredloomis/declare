import React          from "react"
import {compose, setDisplayName} from "recompose"

import SignInComponent from "../components/SignIn"
import withReduxDispatch from "./WithReduxDispatch"

import {createToken} from "../actions/User"

const SignInBase = props => {
    const createTokenU = authData => {
        props.createToken("5a54198ba3f45d732d9a130f", authData)
    }
    return <SignInComponent onSubmit={createTokenU}/>
}

const enhance = compose(
    withReduxDispatch({
        createToken: {
            parameterized: createToken
        }
    }),
    setDisplayName("SignInContainer")
)

export default enhance(SignInBase)

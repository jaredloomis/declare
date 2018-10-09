import React from "react"
import {
    compose, setDisplayName
} from "recompose"

import Container       from "../components/base/Container"
import Section         from "../components/base/Section"
import Heading         from "../components/base/Heading"
import Link            from "../components/base/Link"
import SignInContainer from "../containers/SignIn"

const SignIn = props => {
    return <Section><Container>
        <Heading>Log In</Heading>
        <SignInContainer {...props}/>
        <span>Don't have an account? <Link to="#/SignUp">Sign Up!</Link></span>
    </Container></Section>
}

const enhance = compose(
    setDisplayName("SignInPage")
)

export default enhance(SignIn)

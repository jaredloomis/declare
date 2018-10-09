import React from "react"
import {
    compose, setDisplayName
} from "recompose"

import Container       from "../components/base/Container"
import Section         from "../components/base/Section"
import Link            from "../components/base/Link"
import Heading         from "../components/base/Heading"
import SignUpContainer from "../containers/SignUp"

const SignUp = props => {
    return <Section><Container>
        <Heading>Sign Up</Heading>
        <SignUpContainer {...props}/>
        <span>Already have an account? <Link to="#/SignIn">Log In</Link></span>
    </Container></Section>
}

const enhance = compose(
    setDisplayName("SignUpPage")
)

export default enhance(SignUp)

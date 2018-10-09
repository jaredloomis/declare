import React from "react"
import {
    withState, setDisplayName, compose
} from "recompose"

import TextInput from "./base/TextInput"
import Button    from "./base/Button"
import Group     from "./base/Group"

const SignUpBase = ({email, password, setEmail, setPassword, onSubmit}) => <Group>
    <TextInput label="Email"             onChange={setEmail}/>
    <TextInput label="Password" password onChange={setPassword}/>
    <Button type="primary" onClick={() => onSubmit({email, password})}>
        Sign Up
    </Button>
</Group>


const enhance = compose(
    withState("email",    "setEmail",    ""),
    withState("password", "setPassword", ""),
    setDisplayName("SignUp")
)

export default enhance(SignUpBase)

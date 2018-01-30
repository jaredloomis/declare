import React     from "react"
import {
    withState, setDisplayName, compose
} from "recompose"

import TextInput from "./base/TextInput"
import Button    from "./base/Button"

const SignInBase = ({email, password, setEmail, setPassword, onSubmit}) => <div>
    <TextInput label="Email"    onChange={setEmail}/>
    <TextInput label="Password" onChange={setPassword}/>
    <Button onClick={() => onSubmit({email, password})}>
        Submit
    </Button>
</div>


const enhance = compose(
    withState("email",    "setEmail",    ""),
    withState("password", "setPassword", ""),
    setDisplayName("SignIn")
)

export default enhance(SignInBase)

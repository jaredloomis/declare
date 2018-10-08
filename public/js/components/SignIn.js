import React from "react"
import {
    withState, setDisplayName, compose
} from "recompose"

import TextInput from "./base/TextInput"
import Button    from "./base/Button"
import Group     from "./base/Group"
import Message   from "./base/Message"

const SignInBase = ({error, email, password, setEmail, setPassword, onSubmit}) => <div>
    {error && <Message type="danger" header="Error during sign in">
        {error}
    </Message>}
    <Group>
        <TextInput label="Email"             onChange={setEmail}/>
        <TextInput label="Password" password onChange={setPassword}/>
        <Button type="primary" onClick={() => onSubmit({email, password})}>
            Sign In
        </Button>
    </Group>
</div>

const enhance = compose(
    withState("email",    "setEmail",    ""),
    withState("password", "setPassword", ""),
    setDisplayName("SignIn")
)

export default enhance(SignInBase)

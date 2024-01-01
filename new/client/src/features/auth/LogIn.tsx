import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { getUser, login } from "./api";
import { authTokenAtom, authUserAtom } from "./store";

export function LogIn() {
  const [error, setError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useAtom(authTokenAtom);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const token = await login(username, password);
      setError(false);
      setToken(token);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  // Redirect if logged in
  useEffect(() => {
    if (token) {
      return navigate("/");
    }
  }, [token]);

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
      {error && (
        <Alert color="failure">Invalid username or password. Try again.</Alert>
      )}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username / Email" />
        </div>
        <TextInput
          id="username"
          type="username"
          placeholder="name@declare.com"
          required
          onChange={ev => setUsername(ev?.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
          required
          onChange={ev => setPassword(ev?.target.value)}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

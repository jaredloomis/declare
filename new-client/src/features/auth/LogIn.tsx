import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useAtom } from 'jotai';
import { authToken } from "./store";
import { useNavigate } from "react-router-dom";

export function LogIn() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [token, setToken] = useAtom(authToken);
  const navigate = useNavigate();

  // Redirect if logged in
  useEffect(() => {
    if(token) {
      return navigate('');
    }
  }, [token]);

  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput id="email1" type="email" placeholder="name@declare.com" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser, login } from './api';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Label } from '../../components/Label';
import { useAuthStore } from '../../authStore';
import { parseJwt } from './jwt_util';

export function LogIn() {
  const [error, setError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const token = await login(username, password);
      auth.setToken(token);
      const { id } = parseJwt(token);
      const user = await getUser(id);
      auth.setUser(user);
      setError(false);
      navigate('/');
    } catch (error) {
      setError(true);
    }
  };

  // Redirect if logged in
  useEffect(() => {
    if (auth.user) {
      return navigate('/');
    }
  }, [auth.user]);

  return (
    <>
      <h1 className='text-3xl font-bold'>Log in</h1>
      <form className='flex max-w-md flex-col gap-4' onSubmit={handleSubmit}>
        {error && <Alert color='failure'>Invalid username or password. Try again.</Alert>}
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='username' value='Username / Email' />
          </div>
          <TextInput id='email' label='Email' placeholder='name@declareqa.com' required onValueChange={setUsername} />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='password' value='Your password' />
          </div>
          <TextInput
            id='password'
            label='Password'
            type='password'
            required
            onChange={ev => setPassword(ev?.target.value)}
          />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </>
  );
}

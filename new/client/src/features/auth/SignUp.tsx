import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from './api';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Label } from '../../components/Label';
import { useAuthStore } from '../../authStore';

export default function SignUp() {
  const [error, setError] = useState<boolean>(false);
  const [accountName, setAccountName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const _user = await signup(accountName, username, password);
      setError(false);
      navigate('/login');
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
      <h1 className='text-3xl font-bold'>Sign Up</h1>
      <form className='flex max-w-md flex-col gap-4' onSubmit={handleSubmit}>
        {error && <Alert color='failure'>Invalid username or password. Try again.</Alert>}
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='accountName' value='Account Name' />
          </div>
          <TextInput
            id='accountName'
            label='Account Name'
            placeholder='Your Company'
            required
            onValueChange={setAccountName}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='username' value='Email' />
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

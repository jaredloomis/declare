import { gql } from '@apollo/client';
import { client } from '../../graphql';
import { User } from '../../gql/graphql';

export async function login(username: string, password: string): Promise<string> {
  const mutation = gql`
    mutation Login($username: String!, $password: String!) {
      login(email: $username, password: $password)
    }
  `;

  const { data } = await client.mutate({
    mutation,
    variables: {
      username,
      password,
    },
  });

  if (!data?.login) {
    throw new Error('Invalid username or password');
  }

  return data.login;
}

export async function signup(accountName: string, username: string, password: string): Promise<string> {
  const mutation = gql`
    mutation SignUp($accountName: String!, $username: String!, $password: String!) {
      signup(accountName: $accountName, adminEmail: $username, adminPassword: $password) {
        id
      }
    }
  `;

  const { data } = await client.mutate({
    mutation,
    variables: {
      accountName,
      username,
      password,
    },
  });

  if (!data?.signup) {
    throw new Error('Failed to create account');
  }

  return data.signup;
}

export async function getUser(id: number): Promise<User> {
  const query = gql`
    query GetUser($id: Int!) {
      user(id: $id) {
        id
        accountId
        email
      }
    }
  `;

  const { data } = await client.query({
    query,
    variables: {
      id,
    },
  });

  return data.user;
}

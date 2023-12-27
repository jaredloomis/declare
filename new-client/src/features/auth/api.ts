import { gql } from "@apollo/client";
import { client } from "../../graphql";

export async function createToken(
  username: string,
  password: string,
): Promise<string> {
  const mutation = gql`
    mutation createToken($account: ID, $username: String!, $password: String!) {
      createToken(account: $account, email: $username, password: $password) {
        data {
          token
        }
        error
      }
    }
  `;

  const { data } = await client.mutate({
    mutation,
    variables: {
      account: null,
      username,
      password,
    },
  });

  return data.createToken.data.token;
}

export async function createAccount(
  username: string,
  password: string,
): Promise<string> {
  const mutation = gql`
    mutation InitAccount($account: AccountInput!, $username: String!, $password: String!) {
      createAccount(account: $account) {
        data { _id }
        error
      }
      createUser(account: $account, email: $username, password: $password) {
    }
  `;

  const { data } = await client.mutate({
    mutation,
    variables: {
      account: null,
      username,
      password,
    },
  });

  return data.createToken.data.token;
}

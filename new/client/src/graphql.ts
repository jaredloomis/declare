import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';
import { graphqlUrl } from './env';

const headerLink = setContext((request, previousContext) => ({
  headers: {
    ...previousContext.headers,
    authorization: `Bearer ${localStorage.getItem('declare_token') || ''}`,
  },
}));

const removeTypenameLink = removeTypenameFromVariables();

import introspectionResult from './gql/fragments.json';

export const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache({
    possibleTypes: introspectionResult.possibleTypes,
  }),
  link: headerLink.concat(removeTypenameLink).concat(
    new HttpLink({
      uri: graphqlUrl,
    })
  ),
});

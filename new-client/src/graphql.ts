import { ApolloClient, InMemoryCache } from "@apollo/client";
import { graphqlUrl } from "./env";

export const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});

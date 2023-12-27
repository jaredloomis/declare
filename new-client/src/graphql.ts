import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { graphqlUrl } from "./env";
import Cookies from "js-cookie";

const headerLink = setContext((request, previousContext) => ({
  headers: {
    ...previousContext.headers,
    token: Cookies.get("declare_token") || "",
  },
}));

export const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
  link: headerLink.concat(
    new HttpLink({
      uri: graphqlUrl,
    }),
  ),
});

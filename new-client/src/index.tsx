import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { App } from "./App";
import { graphqlUrl } from "./env";
import store from './store'

const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);

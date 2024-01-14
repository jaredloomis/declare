import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';

import { App } from './App';
import { HashRouter } from 'react-router-dom';

import { client } from './graphql';
import './i18n';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <HashRouter>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </HashRouter>
);

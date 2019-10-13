import App from './App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { hydrate } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { createClient } from './lib/apollo'
import { HelmetProvider } from 'react-helmet-async'

const client = createClient()

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept()
}

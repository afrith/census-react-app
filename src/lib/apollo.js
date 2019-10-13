import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export const createClient = () => {
  const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: process.env.RAZZLE_API_URL,
      fetch
    }),
    cache: process.browser
      ? new InMemoryCache().restore(window.__APOLLO_STATE__)
      : new InMemoryCache()
  })

  return client
}

import { ApolloClient, HttpLink } from 'apollo-boost'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'

import fetch from 'isomorphic-fetch'

const dataIdFromObject = object => {
  switch (object.__typename) {
    case 'Place':
      return `Place:${object.code}`
    case 'PlaceType':
      return `PlaceType:${object.name}`
    default:
      return defaultDataIdFromObject(object)
  }
}

const cacheRedirects = {
  Query: {
    place: (_, args, { getCacheKey }) =>
      getCacheKey({ __typename: 'Place', code: args.code })
  }
}

export const createClient = () => {
  const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: process.browser ? '/graphql' : process.env.RAZZLE_GRAPHQL_URL,
      fetch
    }),
    cache: process.browser
      ? new InMemoryCache({ dataIdFromObject, cacheRedirects }).restore(window.__APOLLO_STATE__)
      : new InMemoryCache({ dataIdFromObject, cacheRedirects })
  })

  return client
}

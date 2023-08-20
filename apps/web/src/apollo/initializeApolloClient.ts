import { NormalizedCacheObject } from '@apollo/client';
import { Manager } from '../authority';
import { isServer } from '../configs';
import createApolloClient, { Apollo } from './createApolloClient';

let client: Apollo | undefined;

const initializeApolloClient = (authorityManager: Manager, initialState?: NormalizedCacheObject): Apollo => {
  const _client =
    client ??
    createApolloClient(() => {
      const tokens = authorityManager.getTokens();
      return tokens.bearerToken;
    });

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _client.apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _client.apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (isServer) {
    return _client;
  }

  // Create the Apollo Client once in the client
  if (!client) {
    client = _client;
  }
  
  return _client;
};

export default initializeApolloClient;

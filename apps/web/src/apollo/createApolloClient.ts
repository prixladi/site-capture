import ws from 'ws';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getGraphqlConfig, isServer } from '../configs';
import { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import typePolicies from './typePolicies';
import { SubscriptionClient } from 'subscriptions-transport-ws';

type Apollo = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  subscriptionClient: SubscriptionClient;
};

const createWsLink = (getBearerToken: () => string | null, url?: string) => {
  if (!isServer && !url) {
    throw new Error('Websocket endpoint url was not specified in config.');
  }

  const subscriptionClient = new SubscriptionClient(
    // Default url to be used with SSG
    url || '/graphql',
    {
      reconnect: true,
      lazy: true,
      timeout: 20000,
      connectionParams: () => {
        const token = getBearerToken();

        if (token) {
          return {
            Authorization: `Bearer ${token}`,
          };
        }

        return {};
      },
    },
    isServer ? ws : undefined,
  );

  const wsLink = new WebSocketLink(subscriptionClient);

  return { subscriptionClient, wsLink };
};

const createHttpLink = (getBearerToken: () => string | null, url?: string) => {
  if (!isServer && !url) {
    throw new Error('Graphql endpoint url was not specified in config.');
  }

  const authLink = setContext((_, { headers }) => {
    const token = getBearerToken();

    if (token) {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return { headers: {} };
  });

  const httpLink = authLink.concat(
    // Default url to be used with SSG
    new HttpLink({
      uri: url || '/graphql',
    }),
  );

  return httpLink;
};

const createApolloClient = (getBearerToken: () => string | null): Apollo => {
  const config = getGraphqlConfig();

  const httpLink = createHttpLink(getBearerToken, config.url)
  const { wsLink, subscriptionClient } = createWsLink(getBearerToken, config.wsUrl);

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  const apolloClient = new ApolloClient({
    ssrMode: isServer, // set to true for SSR
    uri: config.url,
    link: splitLink,
    cache: new InMemoryCache({ typePolicies }),
  });

  return {
    apolloClient,
    subscriptionClient,
  };
};

export type { Apollo };
export default createApolloClient;

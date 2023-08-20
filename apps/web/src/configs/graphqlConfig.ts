import { isServer } from './shared';

type Config = {
  url: string;
  wsUrl: string;
};

const getConfig = (): Config => ({
  url: isServer ? (process.env.GRAPHQL_URL as string) : window.config.graphqlUrl,
  wsUrl: isServer ? (process.env.GRAPHQL_WS_URL as string) : window.config.graphqlWsUrl,
});

export default getConfig;

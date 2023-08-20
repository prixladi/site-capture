import { isServer } from './shared';

type Config = {
  url: string;
  clientId: string;
};

const getConfig = (): Config => ({
  url: isServer ? (process.env.AUTH_API_URL as string) : window.config.authApiUrl,
  clientId: isServer ? (process.env.AUTH_API_CLIENT_ID as string) : window.config.authApiClientId,
});

export default getConfig;

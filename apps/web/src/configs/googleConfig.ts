import { isServer } from './shared';

type Config = {
  clientId: string;
};

const getConfig = (): Config => ({
  clientId: isServer ? (process.env.GOOGLE_CLIENT_ID as string) : window.config.googleClientId,
});

export default getConfig;

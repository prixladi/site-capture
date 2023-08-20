import getGraphqlConfig from './graphqlConfig';
import getAuthApiConfig from './authApiConfig';
import getGoogleConfig from './googleConfig';
import { isServer } from './shared';

declare global {
  interface Window {
    config: {
      graphqlUrl: string;
      graphqlWsUrl: string;
      authApiUrl: string;
      authApiClientId: string;
      googleClientId: string;
    };
  }
}

export { isServer };
export { getGraphqlConfig, getAuthApiConfig, getGoogleConfig };

import { ApolloClient } from '@apollo/client';
import { NextRouter } from 'next/dist/client/router';
import { Apollo } from '../apollo/createApolloClient';
import { Callbacks, Manager } from '../authority';
import { HomeRoute, AuthRoute } from '../routes';
import { authServerErrorNotification, loggedInNotification, loggedOutNotification, loginExpiredNotification } from './notificationService';

const defaultCallbacks = (router: NextRouter): Callbacks => ({
  onError: async (err) => {
    authServerErrorNotification();
    console.error(err);
  },
  onUnauthorized: async () => {
    loginExpiredNotification();
    await router.push(AuthRoute);
  },
});

const onSignIn = async (router: NextRouter, { subscriptionClient, apolloClient }: Apollo): Promise<void> => {
  loggedInNotification();
  subscriptionClient.close(true);
  await apolloClient.cache.reset();
  await router.push(HomeRoute);
};

const onLoginExpired = async (manager: Manager, router: NextRouter, apollo: ApolloClient<unknown>): Promise<void> => {
  loginExpiredNotification();
  await apollo.cache.reset();
  await manager.logout();
  await router.push(AuthRoute);
};

const signOut = async (manager: Manager, router: NextRouter, apollo: ApolloClient<unknown>): Promise<void> => {
  await manager.logout();
  loggedOutNotification();
  await apollo.cache.reset();
  await router.push(AuthRoute);
};

export { defaultCallbacks, onLoginExpired, onSignIn, signOut };

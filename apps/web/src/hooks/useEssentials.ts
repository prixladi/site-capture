import { NextRouter, useRouter } from 'next/router';
import { Apollo } from '../apollo/createApolloClient';
import useApollo from '../apollo/useApollo';
import { Manager, useAuthorityManager } from '../authority';

type Essentials = {
  router: NextRouter;
  authManager: Manager;
  apollo: Apollo;
};

const useEssentials = (): Essentials => {
  const router = useRouter();
  const authManager = useAuthorityManager();
  const apollo = useApollo(authManager);

  return { router, authManager, apollo };
};

export default useEssentials;

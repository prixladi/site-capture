import { NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';
import { Manager } from '../authority';
import { Apollo } from './createApolloClient';
import initializeApolloClient from './initializeApolloClient';

const useApollo = (authorityManager: Manager, initialState?: NormalizedCacheObject): Apollo => {
  const store = useMemo(() => initializeApolloClient(authorityManager, initialState), [authorityManager, initialState]);
  return store;
};

export default useApollo;

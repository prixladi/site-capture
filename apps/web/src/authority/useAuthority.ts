import { useMemo } from 'react';
import { Config } from './config';
import createManager, { Manager } from './manager';

const useAuthority = (getConfig: () => Config): Manager => {
  const manager = useMemo(() => createManager(getConfig), [getConfig]);
  return manager;
};

export default useAuthority;

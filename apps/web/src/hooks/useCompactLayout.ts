import { useBreakpointValue } from '@chakra-ui/react';

const useCompactLayout = (): boolean => {
  const isCompact = useBreakpointValue([true, true, true, false]) ?? true;
  return isCompact;
};

export default useCompactLayout;

import { useEffect } from 'react';

const useBeforeUnload = (fc: () => void): void => {
  useEffect(() => {
    window.addEventListener('beforeunload', fc, { passive: true });
    return () => {
      window.removeEventListener('beforeunload', fc);
    };
  }, [fc]);
};

export default useBeforeUnload;

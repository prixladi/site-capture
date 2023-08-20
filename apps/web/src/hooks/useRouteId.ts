import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { objIdRegex } from '../constants';

const useRouteId = (): [string | null, boolean] => {
  const [id, setId] = useState(null as string | null);
  const [invalid, setInvalid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id || !router.query.id) {
      return;
    }

    const { id: routeId } = router.query;

    if (typeof routeId !== 'string' || !routeId.match(objIdRegex)) {
      setInvalid(true);
    } else {
      setId(routeId);
    }
  }, [router, id, setId, setInvalid]);

  return [id, invalid];
};

export default useRouteId;

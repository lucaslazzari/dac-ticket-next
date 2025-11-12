'use client';
import { useEffect, useState } from 'react';
import { UserStats } from '../types/user.stats';
import { usersServiceMock } from '../services/users.service';

export function useStats() {
  const [data, setData] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    usersServiceMock.getStats()
      .then((s) => { if (!canceled) setData(s); })
      .catch((err) => { if (!canceled) setError(err); })
      .finally(() => { if (!canceled) setLoading(false); });

    return () => { canceled = true; };
  }, []);

  return { data, loading, error };
}
import { useEffect, useState } from 'react';
import { UserStats } from '../types/user.stats';
import { usersService } from '../services/users.service';

export function useStats() {
  const [data, setData] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let canceled = false;

    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        const stats = await usersService.getStats();
        if (!canceled) {
          setData(stats);
        }
      } catch (err) {
        if (!canceled) {
          setError(err as Error);
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      canceled = true;
    };
  }, []);

  return { data, loading, error };
}
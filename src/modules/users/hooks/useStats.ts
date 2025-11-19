import { useEffect, useState, useCallback } from 'react';
import { UserStats } from '../types/user.stats';
import { usersService } from '../services/users.service';

export function useStats(refreshKey: any = null) {
  const [data, setData] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await usersService.getStats();
      setData(stats);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let canceled = false;

    fetchStats();

    return () => {
      canceled = true;
    };
  }, [fetchStats, refreshKey]);

  return { data, loading, error, reload: fetchStats };
}
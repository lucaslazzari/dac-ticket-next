import { useEffect, useState, useCallback } from 'react';
import { CustomerStats } from '../types/customer.stats';
import { customersService } from '../services/customers.service';

export function useStats(refreshKey: any = null) {
  const [data, setData] = useState<CustomerStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await customersService.getStats();
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
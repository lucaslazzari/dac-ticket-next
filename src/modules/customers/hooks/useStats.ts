'use client';
import { useEffect, useState } from 'react';
import { CustomerStats } from '../types/customer.stats';
import { customersServiceMock } from '../services/customers.service';

export function useStats() {
  const [data, setData] = useState<CustomerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    customersServiceMock.getStats()
      .then((s) => { if (!canceled) setData(s); })
      .catch((err) => { if (!canceled) setError(err); })
      .finally(() => { if (!canceled) setLoading(false); });

    return () => { canceled = true; };
  }, []);

  return { data, loading, error };
}
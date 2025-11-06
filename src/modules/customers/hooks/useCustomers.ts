'use client';

import { useEffect, useState } from 'react';
import { Customer } from '../types/customer';
import { customersServiceMock, type CustomersService } from '../services/customers.service';

interface Params {
  search?: string;
  page?: number;
  perPage?: number;
}

export function useCustomers(
  initialParams: Params = { page: 1, perPage: 5 },
  service: CustomersService = customersServiceMock // troque por customersServiceHttp quando tiver API
) {
  const [params, setParams] = useState<Params>(initialParams);
  const [data, setData] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await service.list({
          search: params.search,
          page: params.page,
          perPage: params.perPage,
        });
        if (!cancelled) {
          setData(res.data);
          setTotal(res.total);
        }
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.search, params.page, params.perPage, service]);

  return {
    data,
    total,
    loading,
    error,
    params,
    setParams,
  };
}
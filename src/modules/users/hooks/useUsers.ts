'use client';

import { useEffect, useState } from 'react';
import { User } from '../types/user';
import { usersServiceMock, type UsersService } from '../services/users.service';

interface Params {
  search?: string;
  page?: number;
  perPage?: number;
}

export function useUsers(
  initialParams: Params = { page: 1, perPage: 10 },
  service: UsersService = usersServiceMock // troque por usersServiceHttp quando tiver API
) {
  const [params, setParams] = useState<Params>(initialParams);
  const [data, setData] = useState<User[]>([]);
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
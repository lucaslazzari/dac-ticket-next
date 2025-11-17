import { useState, useEffect } from 'react';
import { usersService } from '../services/users.service'; // o serviço real
import { User } from '../types/user';

export function useUsers(initialParams = { page: 1, perPage: 5 }) {
  const [params, setParams] = useState(initialParams);
  const [data, setData] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    usersService.list(params)
      .then(({ data, total }) => {
        setData(data);
        setTotal(total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params]);

  return { data, total, loading, params, setParams };
}
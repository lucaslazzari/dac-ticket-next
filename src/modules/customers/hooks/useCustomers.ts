import { useState, useEffect } from 'react';
import { customersService } from '../services/customers.service'; // o serviço real
import { Customer } from '../types/customer';

export function useCustomers(initialParams = { page: 1, perPage: 5 }) {
  const [params, setParams] = useState(initialParams);
  const [data, setData] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    customersService.list(params)
      .then(({ data, total }) => {
        setData(data);
        setTotal(total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params]);

  return { data, total, loading, params, setParams };
}
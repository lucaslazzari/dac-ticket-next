'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Customer } from '../types/customer';
import { customersService, type CustomersService } from '../services/customers.service';

export function useCustomerDetail(customerId?: number | null, service: CustomersService = customersService) {
  const [data, setData] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchCustomer = useCallback(async (id?: number | null) => {
    if (!id) {
      setData(null);
      return;
    }
    setLoading(true);
    try {
      const c = await service.getById(id);
      setData(c);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    fetchCustomer(customerId);
  }, [customerId, fetchCustomer]);

  return { data, loading, error, refetch: () => fetchCustomer(customerId) };
}
import { useState } from 'react';
import { customersService } from '../services/customers.service';
import { CustomerFormData } from '../types/customer.fom.data';
import { CustomerCreated } from '../types/customer.created';

export function useCreateCustomer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createCustomer = async (data: CustomerFormData): Promise<CustomerCreated> => {
    console.log("entrou no use Create")
    setLoading(true);
    setError(null);
    try {
      const createdCustomer = await customersService.create(data);
      return createdCustomer;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createCustomer, loading, error };
}
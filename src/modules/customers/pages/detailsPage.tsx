'use client';

import { useState } from 'react';
import { CustomerDetailHeader } from '../components/details/CustomerDetailHeader';
import { CustomerEditForm } from '../components/details/CustomerEditForm';
import { CustomerProductsSection } from '../components/details/CustomerProductsSection';
import { useCustomerDetail } from '../hooks/useCustomerDetail';
import { useProducts } from '../hooks/useProducts';
import { customersServiceMock } from '../services/customers.service';

export default function DetailsPage({ customerId }: { customerId: number }) {
  const { data: customer, loading, refetch } = useCustomerDetail(customerId);
  const { data: allProducts } = useProducts();

  const [mutating, setMutating] = useState(false);

  const handleSave = async (payload: any) => {
    if (!customerId) return;
    setMutating(true);
    try {
      await customersServiceMock.updateCustomer(customerId, payload);
      await refetch();
    } finally {
      setMutating(false);
    }
  };

  const handleAdd = async (productId: number) => {
    if (!customerId) return;
    setMutating(true);
    try {
      await customersServiceMock.addProductToCustomer(customerId, productId);
      await refetch();
    } finally {
      setMutating(false);
    }
  };

  const handleRemove = async (productId: number) => {
    if (!customerId) return;
    setMutating(true);
    try {
      await customersServiceMock.removeProductFromCustomer(customerId, productId);
      await refetch();
    } finally {
      setMutating(false);
    }
  };

  if (loading) return <div className="p-6">Loading customer...</div>;
  if (!customer) return <div className="p-6">Customer not found</div>;

  return (
    <div className="space-y-6 p-6">
      <CustomerDetailHeader title="Customer" />

      <CustomerEditForm
        customer={{
          name: customer.name,
          blulogixAccountNumber: customer.blulogixAccountNumber,
          carrierAccountNumber: customer.carrierAccountNumber,
          status: customer.status,
        }}
        onSave={handleSave}
        loading={mutating}
      />

      <CustomerProductsSection
        products={customer.products ?? []}
        availableProducts={allProducts ?? []}
        onAdd={handleAdd}
        onRemove={handleRemove}
        loading={mutating}
      />
    </div>
  );
}